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
    this.dataService.getLocation()
    .subscribe(position=> {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      let link = `https://api.weather.gov/points/${position.coords.latitude+','}${position.coords.longitude}`;
      this.dataService.getWxLink(link)
      .subscribe((wxLink :any)=> {
          this.dataService.getWx(wxLink.properties.forecastHourly)
         .subscribe((data :any) => {
           this.currentWeatherData = data.properties.periods[0];
        this.currentTemperature = data.properties.periods[0].temperature
        this.currentWindSpeed = data.properties.periods[0].windSpeed;
        this.currentWindDirection = data.properties.periods[0].windDirection;
        this.currentIcon = data.properties.periods[0].icon.replace("small", "large");
         });

         this.dataService.getWx(wxLink.properties.forecast)
         .subscribe((data :any) => {
          this.forecastWeatherData = data.properties.periods; 
         });
      })
    })
  }  
    
}

/*

  function test() {
    this.dataService.getLocation()
    .subscribe(position=> {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      let link = `https://api.weather.gov/points/${position.coords.latitude+','}${position.coords.longitude}`;
      this.dataService.getWxLink(link)
      .subscribe((wxLink :any)=> {
          this.dataService.getWx(wxLink.properties.forecastHourly)
         .subscribe((data :any) => {
           this.currentWeatherData = data.properties.periods[0];
        this.currentTemperature = data.properties.periods[0].temperature
        this.currentWindSpeed = data.properties.periods[0].windSpeed;
        this.currentWindDirection = data.properties.periods[0].windDirection;
        this.currentIcon = data.properties.periods[0].icon.replace("small", "large");
         });

         this.dataService.getWx(wxLink.properties.forecast)
         .subscribe((data :any) => {
          this.forecastWeatherData = data.properties.periods; 
         });
      })
    })

   }
  
   */