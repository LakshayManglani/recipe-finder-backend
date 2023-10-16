import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import cors from 'cors';

dotenv.config();
const PORT = Number(process.env.PORT) || 5000;
const HOSTNAME = process.env.HOSTNAME || '0.0.0.0';
const {KEY} = process.env;

const app = express();

app.use(
  cors({
    origin: 'https://recipefinderbylakshay.netlify.app',
    optionsSuccessStatus: 200,
  }),
);

app.get('/api', async (req, res) => {
  // * API Settings
  const options = {
    method: 'GET',
    url: 'https://low-carb-recipes.p.rapidapi.com/search',
    params: {
      name: req.query.name,
      // tags: 'keto;dairy-free',
      // includeIngredients: 'egg;butter',
      // excludeIngredients: 'cinnamon',
      // maxPrepareTime: '10',
      // maxCookTime: '20',
      // maxCalories: '500',
      // maxNetCarbs: '5',
      // maxSugar: '3',
      // maxAddedSugar: '0',
      // limit: '10'
    },
    headers: {
      'X-RapidAPI-Key': KEY,
      'X-RapidAPI-Host': 'low-carb-recipes.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    res.status(200).json(response.data);
  } catch (error) {
    console.log(`${error}`);
    res.status(404).end(null);
  }
});

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server is running at ${PORT}`);
});
