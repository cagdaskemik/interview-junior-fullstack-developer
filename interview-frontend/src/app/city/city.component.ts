import { Component } from '@angular/core';
import { CityService } from '../../city.service';

interface City { // Defining the structure of a City object
  uuid: string;
  cityName: string;
  count: number;
}

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent {
  cities: City[] = []; // Array to hold the city data
  searchQuery = ''; // User-inputted search query
  previousSearchQuery = ''; // Previous search query to detect changes
  enableCardView = false; // Toggle between table and card views
  limit = 5; // Number of cities per page
  page = 1; // Current page number
  totalPage = 1; // Total number of pages

  // Decrease page number and search again if not on the first page
  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.search();
    }
  }

  searchMode = 'whole'; // Default search mode ('whole' or 'beginning')

  constructor(private cityService: CityService) { }

  // Increase page number and search again if not on the last page
  nextPage() {
    if (this.page < this.totalPage) {
      this.page++;
      this.search();
    }
  }
  
  // Main search method
  search(): void {
    if (this.searchQuery.trim() !== '') { // If search query is not empty
      if (this.searchQuery !== this.previousSearchQuery) { // If it's a new search query
        this.page = 1; // Reset page to 1
        this.previousSearchQuery = this.searchQuery; // Update previous search query
      }
  
      // Call the city service to fetch cities
      this.cityService.getCities(this.searchQuery, this.searchMode, this.page, this.limit).subscribe((data: {cities: City[], totalCount: number}) => {
        this.cities = data.cities; // Update cities array
        this.totalPage = Math.ceil(data.totalCount / this.limit); // Update total pages
      });
    } else {
      this.cities = []; // Empty the cities array if search query is empty
    }
  }
}
