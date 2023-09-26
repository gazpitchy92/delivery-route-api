# Delivery Route API

Problem: Our delivery driver has a list of Postcodes they need to drop-off at, they need to find the quickest route to all of them.

Solution: This API can be used in a web application or form. It takes in the drivers starting postcode and the delivery postcodes, looks up the latitude and longitude for the postcodes, then arranges into the most economic route on google maps. 


## Building

This project is written in type script, to compile run:

```bash
npx tsc
```

## Hosting

To run use the following code to host the API on http://localhost:3001

```python
node src/index.ts
```

## Using

The api_example.json file in the root of the repo can be used in Postman for the following example:

API Endpoint: /route

Method: POST

Example Request Body:
```
{
    "start": ["DE55 6EH"],
    "postcodes": ["SW1A 1AA", "EC1A 1BB", "SE1 7QD", "W1D 4EG"]
}
```

Example Response Body:
```
{
    "gmaps": "https://www.google.com/maps/dir/?api=1&origin=53.126756,-1.418538&destination=53.126756,-1.418538&waypoints=51.524565,-0.112042|51.514016,-0.131071|51.501009,-0.141588|51.498204,-0.106793&travelmode=driving"
}
```