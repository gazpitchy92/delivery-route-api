import express from 'express';
import Postcodes from './classes/postcodes';
import Maps from './classes/maps';

// Set Opencage API KEY
const opencageApiKey = '9bbd7de4e99b4709b55abdf21515b554';

// Create an instance of the Postcodes service with the API key
const postcodeService = new Postcodes(opencageApiKey);

// Initialize Express.js
const app = express();
const port = 3001;
app.use(express.json());

/**
 * Define a route for handling POST requests to '/route'.
 * This route calculates and returns a route on Google Maps based on provided postcodes.
 */
app.post('/route', async (req, res) => {
  try {
    // Check if the request body contains valid data
    if (!Array.isArray(req.body.postcodes) || !Array.isArray(req.body.start)) {
      throw new Error('Invalid request format.');
    }

    // Locate the starting coordinates based on the first postcode
    const start = await postcodeService.locate(req.body.start[0]);

    try {
      // Sort the postcodes by distance from the starting coordinates
      const sortedPostcodes = await postcodeService.sort(start.lat, start.lon, req.body.postcodes);

      // Generate a Google Maps URL for the route and send it as JSON response
      res.json({
        "gmaps": Maps.get(start.lat, start.lon, sortedPostcodes)
      });
    } catch (error:any) {
      // Handle any errors that occur during sorting or map generation
      res.json({ error: error.message });
      console.error(`Error: ${error.message}`);
    }
  } catch (error) {
    // Handle any errors related to the request format or location lookup
    console.error(error);
  }
});

// Start the Express.js server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});