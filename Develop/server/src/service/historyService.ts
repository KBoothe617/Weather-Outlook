import { promises as fs } from 'fs';
import path from 'path';



// TODO: Define a City class with name and id properties
class City {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
// TODO: Complete the HistoryService class
class HistoryService {
  
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read(): Promise<City[]> {
    const historyFilePath = path.join(__dirname, 'searchHistory.json');
    try {
      const data = await fs.readFile(historyFilePath, 'utf-8');
      const cities = JSON.parse(data) as City[];
      return cities;
    } catch (error) {
      console.error('Error reading file:', error);
      return [];
    }
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]): Promise<void> {
    const historyFilePath = path.join(__dirname, 'searchHistory.json');
    try {
      const data = JSON.stringify(cities, null, 2);
      await fs.writeFile(historyFilePath, data, 'utf-8');
    } catch (error) {
      console.error('Error writing to file:', error);
    }
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities(): Promise<City[]> {
    return this.read();
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(name: string): Promise<void> {
    const cities = await this.read();
    const id = Date.now().toString(); // Generating a simple ID using timestamp
    const newCity = new City(id, name);
    cities.push(newCity);
    await this.write(cities);
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}
}

export default new HistoryService();
