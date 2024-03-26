from typing import Union
from typing_extensions import Annotated
from app.services import es
from app.models.publications import PublicationsSearchResponse, Publication, PublicationsFilters, PublicationsGroupBys
from app.utils.scibert import get_scibert_embeddings
from fastapi import APIRouter, HTTPException, status as statuscode, Depends

publications_routes = APIRouter(
    prefix="/api/publications",
    tags=["Publications"],
    responses={404: {"description": "Not found"}},
)


@publications_routes.get(
    "/search",
    response_model=PublicationsSearchResponse,
    status_code=statuscode.HTTP_200_OK,
    summary="Rechercher des publications",
    description="Rechercher des publications",
)
def search_publication(
    query: Union[str, None] = '*',
    filters: Annotated[str, Depends(PublicationsFilters)] = None,
    groupby: Annotated[str, Depends(PublicationsGroupBys)] = None,
    pageSize: int = 10,
    page: int = 1
):
    query_embeddings = get_scibert_embeddings(query)
    print(query, flush=True)
    print(query_embeddings, flush=True)
    data = es.search(
        index="scanr-publications-dev-20230912",
        query={
            "bool": {
                "must": [
                    {
                        "query_string": {
                            "query": query,
                            "fields": ["title.*^3", "authors.fullName^3", "summary.*^2", "domains.label.*^2"],
                        },
                    }
                ]
            }
        },
        knn={
            "field": "vector_text",
            "query_vector": query_embeddings,
            "k": 5,
            "num_candidates": 50,
            "boost": 1-0.5
        },
        size=pageSize,
    )
    count = data.get('hits').get('total').get('value')
    publications = [Publication(**hit.get('_source'))
                    for hit in data.get('hits').get('hits')]
    return PublicationsSearchResponse(count=count, data=publications)


@publications_routes.get(
    "/{publication_id}",
    response_model=Publication,
    status_code=statuscode.HTTP_200_OK,
    summary="Trouver une publication par son identifiant",
    description="Trouver une publication par son identifiant",
)
def search_publication(publication_id: str):
    data = es.search(
        index="scanr-publications-20230912",
        body={
            "query":
              {"query_string": {
                  "query": f"id:{publication_id}",
                  "fields": ["id"],
              }}
        },
        size=1,
    )
    try:
        return Publication(**data.get('hits').get('hits')[0].get('_source'))
    except:
        raise HTTPException(
            status_code=statuscode.HTTP_404_NOT_FOUND,
            detail="Publication not found",
        )
