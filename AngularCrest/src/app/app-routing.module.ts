import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GetTodoComponent } from './get-todo/get-todo.component';
import { GetTodoListComponent } from './get-todo-list/get-todo-list.component';
import { CreateTodoComponent } from './create-todo/create-todo.component';
import { UpdateTodoComponent } from './update-todo/update-todo.component';
import { ViewTodoComponent } from './view-todo/view-todo.component';
import { CalculateBMIComponent } from './calculate-bmi/calculate-bmi.component';
import { UploadFilesComponent } from './upload-files/upload-files.component';
import { WeatherComponent } from './weather/weather.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { ForCastWeatherComponent } from './for-cast-weather/for-cast-weather.component';
import { PaintComponent } from './paint/paint.component';

const routes: Routes = [
  {path:'' , component:LoginComponent},
  {path:'login', component:LoginComponent},
  {path:'get-todo', component:GetTodoComponent},
  {path:'get-todo-list', component:GetTodoListComponent},
  {path:'create-todo', component:CreateTodoComponent},
  {path:'update-todo', component:UpdateTodoComponent},
  {path:'view-todo', component:ViewTodoComponent},
  {path:'calculate-bmi', component:CalculateBMIComponent},
  {path:'upload-files', component:UploadFilesComponent},
  {path:'app-weather',component:WeatherComponent},
  {path:'app-current-weather',component:CurrentWeatherComponent},
  {path:'app-for-cast-weather',component:ForCastWeatherComponent},
  {path:'app-paint',component:PaintComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 


}
