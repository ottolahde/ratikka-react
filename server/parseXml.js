const fs = require("fs");
const DOMParser = require("xmldom").DOMParser;



export function readXmlFile() {
  fs.readFile("resp.xml", "utf8", (error, xmlString) => {
    if (error) {
      console.error(error);
      return;
    }

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");

    const monitoredCallElements = xmlDoc.getElementsByTagName("MonitoredCall");
    const expectedArrivalTimeElement = monitoredCallElements[0].getElementsByTagName("ExpectedArrivalTime")[0];
    //const expectedArrivalTime = expectedArrivalTimeElement.textContent;
    
    

    const now = new Date();
    const expectedArrivalTime = new Date(expectedArrivalTimeElement.textContent);
    const minutesUntil = (expectedArrivalTime - now) / (60 * 1000);
    const minutesUntilRounded = parseFloat(minutesUntil.toFixed(1));
    console.log(expectedArrivalTime);
    console.log(minutesUntilRounded);
    return minutesUntilRounded;
  });
}
