import { Router, type Request, type Response } from 'express';
const router = Router();
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';
//import historyService from '../../service/historyService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  // TODO: GET weather data from city name
  try {
    const weatherData = await WeatherService.getWeatherForCity(req.body.cityName);
  // TODO: save city to search history
    HistoryService.addCity(req.body.cityName);
    res.json(weatherData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// TODO: GET search history
router.get('/history', async (req: Request, res: Response) => {
  HistoryService.getCities().then((data) => {
    return res.json(data);
  }).catch((err) => {
    res.status(500).json(err);
  });

});

// * BONUS TODO: DELETE city from search history
//router.delete('/history/:id', async (req: Request, res: Response) => {});

export default router;
