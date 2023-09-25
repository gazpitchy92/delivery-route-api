import express from 'express';
import Postcodes from './classes/postcodes';
import Maps from './classes/maps';

// Set Opencage API KEY
const opencageApiKey = '9bbd7de4e99b4709b55abdf21515b554';
const postcodeService = new Postcodes(opencageApiKey);

// Startup Express.js
const app = express();
const port = 3001;
app.use(express.json());

// Get route data
app.post('/route', async (req: any, res: any) => {
  try {
    if (!Array.isArray(req.body.postcodes) || !Array.isArray(req.body.start)) {
      throw new Error('Invalid request format.');
    }
    const start = await postcodeService.locate(req.body.start[0])
    try {
      const sortedPostcodes = await postcodeService.sort(start.lat, start.lon, req.body.postcodes);
      res.json({
        "gmaps":Maps.get(start.lat, start.lon, sortedPostcodes)
    });
    } catch (error:any) {
      res.json({ error: error.message });
      console.error(`Error: ${error.message}`);
    }
  } catch(error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});