![image](https://user-images.githubusercontent.com/63849800/213023950-a55caddb-5cc0-4d25-a8e3-0451d590a633.png)

## Demo at [ottolahde.fi](http://ottolahde.fi)

# Public Transport Time Remaining

This project is a small web application that shows the time remaining until the next public transport arrives at a stop. The application uses python to fetch the Waltti API and writes the data in a XML file. Back end parses the wanted XML data returned by the API.

# Siri
>[SIRI](https://www.transmodel-cen.eu/siri-standard/) is a CEN Technical Standard that specifies a European interface standard for exchanging information about the planned, current or projected performance of real-time public transport operations between different computer systems.



# Setup

    Clone the repository
    Run npm install in /client and /server
    Run npm start to start the development server
    Access the application at http://localhost:3000

# How to use

Once the application is running, open your browser and navigate to http://localhost:3000
Once the page is loaded, the time remaining until the next public transport arrives will be displayed at the top of the page.
time remaining will update every 2 seconds on its own, when the website is open.

# Note

This application is currently set to request the data from Waltti API, however, you need to have API access key to use it. If you don't have API access key, this project will not work.
Also the API is providing data only for Tampere region.

During the night time Waltti API often returns incorrect XML file lacking any information such as
```
<?xml version="1.0" encoding="UTF-8"?>
<Siri xmlns="http://www.siri.org.uk/siri" xmlns:ns2="http://www.ifopt.org.uk/acsb" xmlns:ns3="http://www.ifopt.org.uk/ifopt" xmlns:ns4="http://datex2.eu/schema/1_0/1_0">
  <ServiceDelivery>
    <ResponseTimestamp>2023-01-18T00:21:33.536+02:00</ResponseTimestamp>
    <ProducerRef>MTSLIVE</ProducerRef>
    <Status>true</Status>
    <MoreData>false</MoreData>
    <StopMonitoringDelivery version="1.3">
      <ResponseTimestamp>2023-01-18T00:21:33.536+02:00</ResponseTimestamp>
      <Status>true</Status>
      <ValidUntil>2023-01-18T00:22:03.536+02:00</ValidUntil>
    </StopMonitoringDelivery>
  </ServiceDelivery>
</Siri>
```
