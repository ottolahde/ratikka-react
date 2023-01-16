import requests
from requests.auth import HTTPBasicAuth
import time

url = "https://data.waltti.fi/tampere/api/sirirealtime/v1.3/ws"
headers = {'Content-Type': 'application/xml'}

with open('data.xml', 'r') as f:
    xml_data = f.read()

last_request_time = 0

while True:
    current_time = time.time()
    if current_time - last_request_time >= 10:
        response = requests.post(url, data=xml_data, headers=headers, auth=HTTPBasicAuth(
            '6066475138518393', 'ywa0q7BPqgzDTv5g6Kh8uqo1SjQCHaPm'))
        with open('resp.xml', 'w') as f:
            f.write(response.text)
        last_request_time = current_time
    else:
        print("Waiting for 10 seconds before making a new request.")
        time.sleep(1)
