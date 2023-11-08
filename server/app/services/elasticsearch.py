import os
from elasticsearch import Elasticsearch

es = Elasticsearch(
    hosts=[{
        'scheme': 'https',
        'host': os.environ.get('ELASTIC_HOST', 'localhost'),
        'port': 443,
    }],
    http_auth=(os.environ.get('ELASTIC_USER'), os.environ.get('ELASTIC_PWD')),
)
