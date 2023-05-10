import { Component, OnInit } from '@angular/core';
import { TodoServiceService } from '../todo-service.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit{
  weather: any;
  humidity:any;
  temperature:number=0;
  date:any;
  name :string ="";
  weather1: any;
  weather2: any;

  constructor(private weatherApiService:TodoServiceService){}
  
  ngOnInit(): void {
    this.firstMethod();
    this.secondMethod();
    this.thirdMethod();
    
  }

firstMethod()
{
  this.weatherApiService.getWeatherApi().subscribe((data:any) => {
    console.log(data);
    this.weather = data;
});
}

secondMethod()
{
  this.weatherApiService.getAWeatherApi().subscribe((data1:any) => {
    console.log(data1);
    this.weather1 = data1;
});
}

thirdMethod()
{
  this.weatherApiService.getBWeatherApi().subscribe((data2:any) => {
    console.log(data2);
    this.weather2 = data2;
  });
}


}
