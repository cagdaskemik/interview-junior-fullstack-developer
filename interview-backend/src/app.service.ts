import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

// Define the interface for a City object
export interface City {
  uuid: string;
  cityName: string;
  count: number;
}

@Injectable()
export class CityService {
  private readonly cities: City[];

  // Constructor reads cities data from a JSON file
  constructor() {
    // Read the JSON file from the specified path and parse it into the 'cities' array
    this.cities = JSON.parse(fs.readFileSync(path.join(__dirname, '../../cities.json'), 'utf-8'));
    //Ideally, its plasusible to use a database and perform other crud operations
  }

  // Search for cities based on query, search mode, page number, and limit
  searchCities(query: string, searchMode: string, page: number = 1, limit: number = 5): {cities: City[], totalCount: number} {
    // Decrement the page number by 1 to make it 0-indexed
    const adjustedPage = page - 1;
    let filteredCities;

    // Check the search mode and filter the cities accordingly
    if (searchMode === 'beginning') {
      // In 'beginning' mode, filter cities that start with the query string
      filteredCities = this.cities.filter(city => city.cityName.toLowerCase().startsWith(query.toLowerCase()));
    } else {
      // Otherwise, filter cities that include the query string anywhere in the name
      filteredCities = this.cities.filter(city => city.cityName.toLowerCase().includes(query.toLowerCase()));
    }

    // Return the filtered and paginated list of cities, along with the total count
    return {
      cities: filteredCities.slice(adjustedPage * limit, (adjustedPage * limit) + limit),
      totalCount: filteredCities.length
    };
  }
}
