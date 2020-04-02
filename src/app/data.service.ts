import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, mergeMap} from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getCurrentWeather(type) {
    return this.http.get('https://api.weather.gov/points/42.026721,-71.285873').pipe
    (map((grid :any) => 
    {
        return grid.properties[type];
     }), mergeMap(link => {
       return this.http.get(link);
     })
     )
  }



}


// https://api.weather.gov/gridpoints/BOX/70,55/forecast/hourly  link to our coords hourly forecast

//  https://api.weather.gov/points/39.7456,-97.0892    use coords to get link above
//  .properties.forecastHourly
//  can get city/state from here too