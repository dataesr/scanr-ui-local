from typing import List, Optional, Dict
from pydantic import BaseModel, Field, HttpUrl
from .commons import Lang


class Affiliation(BaseModel):
    id: str = Field(
        None,
        description="Unique identifier for the affiliation.",
        example="grid.15711.33"
    )
    label: Dict[str, str] = Field(
        {},
        description="Label information for the affiliation."
    )
    acronym: Dict[str, str] = Field(
        {},
        description="Acronym information for the affiliation."
    )
    address: Optional[List[Dict[str, Optional[str]]]] = Field(
        [],
        description="List of address details for the affiliation."
    )
    gps: Optional[Dict[str, Optional[float]]] = Field(
        {},
        description="GPS coordinates for the affiliation."
    )
    postcode: Optional[str] = Field(
        None,
        description="Postal code for the affiliation."
    )
    city: Optional[str] = Field(
        None,
        description="City for the affiliation."
    )
    citycode: Optional[str] = Field(
        None,
        description="City code for the affiliation."
    )
    localisationSuggestions: Optional[List[str]] = Field(
        [],
        description="List of location suggestions for the affiliation."
    )
    country: Optional[str] = Field(
        None,
        description="Country for the affiliation."
    )
    provider: Optional[str] = Field(
        None,
        description="Provider information for the affiliation."
    )
    score: Optional[float] = Field(
        None,
        description="Score for the affiliation."
    )


class ExternalId(BaseModel):
    type: str = Field(
        None,
        description="Type of the external identifier."
    )
    id: str = Field(
        None,
        description="Value of the external identifier."
    )


class Author(BaseModel):
    firstName: str = Field(
        None,
        description="First name of the author."
    )
    lastName: str = Field(
        None,
        description="Last name of the author."
    )
    fullName: str = Field(
        None,
        description="Full name of the author."
    )
    person: str = Field(
        None,
        description="Identifier for the author."
    )
    role: str = Field(
        None,
        description="Role of the author."
    )
    affiliations: List[Affiliation] = Field(
        [],
        description="List of affiliations associated with the author."
    )


class OaEvidence(BaseModel):
    """
    Pydantic model for open access evidence of a publication.
    """
    hostType: str = Field(
        None,
        description="Type of host providing open access."
    )
    version: str = Field(
        None,
        description="Version of the publication for open access."
    )
    license: str = Field(
        None,
        description="License information for open access."
    )
    url: HttpUrl = Field(
        None,
        description="URL providing open access evidence."
    )
    pdfUrl: HttpUrl = Field(
        None,
        description="URL to the PDF for open access."
    )
    landingPageUrl: HttpUrl = Field(
        None,
        description="URL to the landing page for open access."
    )


class Source(BaseModel):
    """
    Pydantic model for the source of a publication.
    """
    title: str = Field(
        None,
        description="Title of the source."
    )
    publisher: str = Field(
        None,
        description="Publisher of the source."
    )
    journalIssns: List[str] = Field(
        [],
        description="List of ISSNs associated with the source."
    )
    isOa: bool = Field(
        None,
        description="Indicates whether the source is open access."
    )
    isInDoaj: bool = Field(
        None,
        description="Indicates whether the source is in the Directory of Open Access Journals (DOAJ)."
    )


class Domain(BaseModel):
    """
    Pydantic model for a domain associated with a publication.
    """
    label: Lang = Field(
        default_factory=Lang,
        description="Label information for the domain."
    )
    code: str = Field(
        None,
        description="Code associated with the domain."
    )
    type: str = Field(
        None,
        description="Type of the domain (e.g., wikidata)."
    )
    count: int = Field(
        None,
        description="Count associated with the domain."
    )


class Publication(BaseModel):
    id: str = Field(
        None,
        description="Unique identifier for the publication.",
        example="doi10.3917/poeu.pr1.0006"
    )
    title: Lang = Field(
        default_factory=Lang,
        description="Title of the publication in multiple languages."
    )
    summary: Lang = Field(
        default_factory=Lang,
        description="Summary of the publication in multiple languages."
    )
    doiUrl: HttpUrl = Field(
        None,
        description="URL to the DOI (Digital Object Identifier) of the publication.",
        example="http://doi.org/10.3917/poeu.pr1.0006"
    )
    externalIds: List[ExternalId] = Field(
        [],
        description="List of external identifiers associated with the publication."
    )
    year: int = Field(
        None,
        description="Year of publication.",
        example=2024
    )
    publicationDate: str = Field(
        None,
        description="Publication date of the article in ISO format.",
        example="2024-02-03T00:00:00"
    )
    type: str = Field(
        None,
        description="Type of publication (e.g., journal-article)."
    )
    productionType: str = Field(
        None,
        description="Type of production (e.g., publication)."
    )
    isOa: bool = Field(
        None,
        description="Indicates whether the publication is open access."
    )
    oaEvidence: OaEvidence = Field(
        {},
        description="Evidence of open access for the publication."
    )
    source: Source = Field(
        {},
        description="Information about the source of the publication."
    )
    domains: List[Domain] = Field(
        [],
        description="List of domains associated with the publication."
    )
    affiliations: List[Affiliation] = Field(
        [],
        description="List of affiliations associated with the authors of the publication."
    )
    authorsCount: int = Field(
        None,
        description="Number of authors contributing to the publication."
    )
    authors: List[Author] = Field(
        [],
        description="List of authors contributing to the publication."
    )


class PublicationsSearchResponse(BaseModel):
    count: int = Field(
        0,
        description="Number of publications matching the query."
    )
    data: list[Publication] = Field(
        [],
        description="List of publications matching the query."
    )


class PublicationsFilters(BaseModel):
    isOa: Optional[bool] = Field(
        None,
        description="Filter publications by open access."
    )
    domains: Optional[str] = Field(
        None,
        description="A comma separated list of domains. (opérator: AND)"
    )
    authors: Optional[str] = Field(
        None,
        description="A comma separated list of authors. (opérator: AND)"
    )
    affiliations: Optional[str] = Field(
        None,
        description="A comma separated list of affiliations. (opérator: AND)"
    )


class PublicationsGroupBys(BaseModel):
    groupBy: Optional[str] = Field(
        None,
        description="A comma separated list of group bys."
    )
