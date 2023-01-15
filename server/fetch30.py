import time
import requests
from requests.auth import HTTPBasicAuth

while True:

    url = "https://data.waltti.fi/tampere/api/sirirealtime/v1.3/ws"
    headers = {'Content-Type': 'application/xml'}

    with open('data.xml', 'r') as f:
        xml_data = f.read()

    response = requests.post(url, data=xml_data, headers=headers, auth=HTTPBasicAuth(
        '6066475138518393', 'ywa0q7BPqgzDTv5g6Kh8uqo1SjQCHaPm'))

    with open('resp.xml', 'w') as f:
        f.write(response.text)

    print(response.status_code)

    # Sleep for 30 seconds
    time.sleep(30)
