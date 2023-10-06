import json
from .modules.dynamodb import get_dynamodb_table
from time import time
from random import choice
from aws_lambda_powertools.event_handler import Response, content_types

from .constants import app_constants
from .constants import config_constants

table = get_dynamodb_table()


def create_url(long_url):
    short_id = generate_short_id()
    short_url = config_constants.APP_URL + short_id
    ttl = generate_expiry_date()

    table.put_item(Item={"short_id": short_id, "url": long_url, "ttl": ttl})

    respone = {
        "message": "URL successfully shortened",
        "result": {"shortUrl": short_url},
    }
    return Response(
        status_code=200,
        content_type=content_types.APPLICATION_JSON,
        body=json.dumps(respone),
    )


def generate_short_id():
    short_id = "".join(
        choice(app_constants.CHARACTERS) for _ in range(app_constants.SHORT_ID_LENGTH)
    )

    if check_if_item_exists(short_id):
        generate_short_id()

    return short_id


def check_if_item_exists(short_id):
    response = table.get_item(Key={"short_id": short_id})
    return "Item" in response


def generate_expiry_date():
    return int(time()) + app_constants.SECONDS_IN_WEEK
