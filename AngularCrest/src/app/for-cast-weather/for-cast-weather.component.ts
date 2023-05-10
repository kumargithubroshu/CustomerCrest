import { Component, OnInit } from '@angular/core';
import { TodoServiceService } from '../todo-service.service';

@Component({
  selector: 'app-for-cast-weather',
  templateUrl: './for-cast-weather.component.html',
  styleUrls: ['./for-cast-weather.component.css']
})
export class ForCastWeatherComponent implements OnInit{

  weather: any;
  humidity:any;
  temperature:number=0;
  date:any;
  name:any;
  lon:any;
  lat:any;


  constructor(private forCastService :TodoServiceService){}

  ngOnInit(): void {
    this.forCastService.getAllBWeather().subscribe((data:any)=>{
      this.weather=data;
      this.humidity=this.weather.humidity;
      this.temperature=this.weather.temperature;
      this.date=this.weather.date;
      this.name=this.weather.name;
      this.lon=this.weather.lon;
      this.lat=this.weather.lat;
  });
  }

}
