import { Component, OnInit } from '@angular/core';
import { TodoServiceService } from '../todo-service.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit{

  city: any;
  weather: any;
  humidity:any;
  temperature:number=0;
  date:any;
  wind:any;
  description:any;
  myName:any;

  constructor(private weatherService:TodoServiceService){}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSubmit() {
    this.weatherService.getWeather(this.city).subscribe(response => {
      console.log(response)
      this.weather = response;
      this.display();
    });
  }

  display()
  {
    this.weatherService.getData().subscribe((data:any)=>{
      this.weather=data;
      console.log(data);
      this.humidity=this.weather.humidity;
      this.temperature=this.weather.temperature;
      this.date=this.weather.date;
      this.wind=this.weather.wind;
      this.description=this.weather.description;
      this.myName=this.weather.name;
});
  }

}
