from app.services import es
from app.models import PublicationsSearchResponse, Publication
from fastapi import APIRouter, HTTPException, status as statuscode

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
    query: str | None = '*',
    filters: str | None = None,
    cursor: str | None = None,
    groupby: str | None = None,
    size: int = 10
):
    data = es.search(
        index="scanr-publications-20230912",
        body={
            "query":
                {
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
                }
        },
        size=size,
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
