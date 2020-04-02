import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public dataService:DataService) { }


  currentWeatherData: string;
  currentWindSpeed : string;
  currentWindDirection : string;
  currentTemperature: string;
  currentIcon: string;

  forecastWeatherData: string;
  forecastWindSpeed : string;
  forecastWindDirection : string;
  forecastTemperature: string;
  forecastIcon: string;


  ngOnInit() {
    this.dataService.getCurrentWeather('forecastHourly')
      .subscribe((data :any) => {
        console.log(data.properties.periods[0]);
        this.currentWeatherData = data.properties.periods[0];
        this.currentTemperature = data.properties.periods[0].temperature
        this.currentWindSpeed = data.properties.periods[0].windSpeed;
        this.currentWindDirection = data.properties.periods[0].windDirection;
        this.currentIcon = data.properties.periods[0].icon.replace("small", "large");
      });

      this.dataService.getCurrentWeather('forecast')
      .subscribe((data :any) => {
        console.log(data.properties.periods);
        this.forecastWeatherData = data.properties.periods;
      });
      
  }

}
