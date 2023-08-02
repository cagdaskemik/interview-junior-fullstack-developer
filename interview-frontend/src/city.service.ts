import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private baseUrl = 'http://localhost:3000/city/search'; // Base URL for the search API

  constructor(private http: HttpClient) { }

  // Function to fetch cities from the backend based on the given parameters
  getCities(query: string, mode: string, page: number, limit: number): Observable<any> {
    if (query.trim() !== '') { // If query is not empty
      // Perform an HTTP GET request to the backend with query parameters
      return this.http.get<any>(`${this.baseUrl}?q=${query}&mode=${mode}&page=${page}&limit=${limit}`);
    } else {
      // Return an observable with empty cities and totalCount if the query is empty
      return new Observable((subscriber) => {
        subscriber.next({cities: [], totalCount: 0});
        subscriber.complete();
      });
    }
  }
}
