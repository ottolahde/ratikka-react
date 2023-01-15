Public Transport Time Remaining

This project is a small web application that shows the time remaining until the next public transport arrives at a stop. The application uses the Waltti API to fetch the data and a Python script to parse the XML data returned by the API.
How it works

    The user navigates to the application in a web browser.
    On page load, the application makes a request to the server for the time remaining until the next public transport arrives.
    The server runs a Python script that makes a request to the Waltti API for data on the arrival times at a specific stop, then parses the XML data returned by the API to calculate the time remaining until the next public transport arrives.
    The server sends the time remaining to the client as a JSON object.
    The application displays the time remaining to the user.

Setup

    Clone the repository
    Run npm install to install all the required dependencies
    Run npm start to start the development server
    Access the application at http://localhost:3000

How to use

    Once the application is running, open your browser and navigate to http://localhost:3000
    Once the page is loaded, the time remaining until the next public transport arrives will be displayed at the top of the page.
    If you want to update the time remaining, you can press the "Get Time Until and Fetch" button.

Note

This application is currently set to request the data from Waltti API, however, you need to have API access key to use it. If you don't have API access key, this project will not work.
Also the API is providing data only for Finnish regions.

This application could be used as an example if you want to learn how to build a web application that fetches data from an API, or how to parse XML data in a Python script. However, it should be noted that this project is a minimal proof of concept and may not be production ready, for example error handling is not yet implemented.
