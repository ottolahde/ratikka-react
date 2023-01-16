const express = require("express");
const path = require("path");
const { spawn } = require("child_process");
const cors = require("cors");
const fs = require("fs");
const DOMParser = require("xmldom").DOMParser;

const PORT = process.env.PORT || 3001;
let responseTimestamp;

const app = express();
app.use(cors());

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/time-until", async (req, res) => {
  const xmlString = await fs.promises.readFile("resp.xml", "utf8");
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, "text/xml");
  const monitoredCallElements = xmlDoc.getElementsByTagName("MonitoredCall");
  const expectedArrivalTimeElement =
    monitoredCallElements[0].getElementsByTagName("ExpectedArrivalTime")[0];
  const now = new Date();
  const expectedArrivalTime = new Date(expectedArrivalTimeElement.textContent);
  const minutesUntil = (expectedArrivalTime - now) / (60 * 1000);
  const minutesUntilRounded = parseFloat(minutesUntil.toFixed(0));
  res.json({ message: minutesUntilRounded });
});

app.get("/fetch", (req, res) => {
  const pythonScript = spawn("python", ["fetch.py"]);
  pythonScript.stdout.on("data", (data) => {
    console.log(data.toString());
  });

  pythonScript.stderr.on("data", (data) => {
    console.error(data.toString());
  });

  pythonScript.on("close", (code) => {
    if (code === 0) {
      res.send({ message: "Moi" });
    } else {
      res
        .status(500)
        .send({ message: "An error occurred while running the script" });
    }
  });
});

app.get("/time-and-fetch", async (req, res) => {
  
  const currentTime = new Date();

  if ( responseTimestamp && currentTime - responseTimestamp < 10 * 1000 ) {
    const xmlString = await fs.promises.readFile("resp.xml", "utf8");
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");

    const responseTimestampElement = xmlDoc.getElementsByTagName("ResponseTimestamp")[0].textContent;
    responseTimestamp = new Date(responseTimestampElement);
    
    const monitoredCallElements = xmlDoc.getElementsByTagName("MonitoredCall");

    const expectedArrivalTimeElement =
      monitoredCallElements[0].getElementsByTagName("ExpectedArrivalTime")[0];

    const now = new Date();
    const expectedArrivalTime = new Date(
      expectedArrivalTimeElement.textContent
    );

    const minutesUntil = (expectedArrivalTime - now) / (60 * 1000);
    const minutesUntilRounded = parseFloat(minutesUntil.toFixed(0));

    if (minutesUntilRounded > 1000) {
      res.json({ message: "Error with waltti API" });
    } else {
      res.json({ message: minutesUntilRounded, timestamp: responseTimestampElement });
    }
  } else {
    const pythonScript = spawn("python", ["fetch.py"]);

    pythonScript.stdout.on("data", (data) => {
      console.log(data.toString());
    });

    pythonScript.stderr.on("data", (data) => {
      console.error(data.toString());
    });

    pythonScript.on("close", async (code) => {
      if (code === 0) {
        // Read the XML file and calculate the time until

        const xmlString = await fs.promises.readFile("resp.xml", "utf8");
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, "text/xml");
    
        const responseTimestampElement = xmlDoc.getElementsByTagName("ResponseTimestamp")[0].textContent;
        console.log(responseTimestampElement);
        responseTimestamp = new Date(responseTimestampElement);
        console.log(responseTimestamp)
        
        const monitoredCallElements = xmlDoc.getElementsByTagName("MonitoredCall");
    
        const expectedArrivalTimeElement =
          monitoredCallElements[0].getElementsByTagName("ExpectedArrivalTime")[0];
    
        const now = new Date();
        const expectedArrivalTime = new Date(
          expectedArrivalTimeElement.textContent
        );
    
        const minutesUntil = (expectedArrivalTime - now) / (60 * 1000);
        const minutesUntilRounded = parseFloat(minutesUntil.toFixed(0));
    
        if (minutesUntilRounded > 1000) {
          res.json({ message: "Error with waltti API" });
        } else {
          res.json({ message: minutesUntilRounded, timestamp: responseTimestampElement });
        }
      } else {
        res
          .status(500)
          .send({ message: "An error occurred while running the script" });
      }
    });
  }
});



app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
