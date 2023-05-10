import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GetTodoComponent } from './get-todo/get-todo.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { GetTodoListComponent } from './get-todo-list/get-todo-list.component';
import { CreateTodoComponent } from './create-todo/create-todo.component';
import { UpdateTodoComponent } from './update-todo/update-todo.component';
import { ViewTodoComponent } from './view-todo/view-todo.component';
import { CalculateBMIComponent } from './calculate-bmi/calculate-bmi.component';
import { UploadFilesComponent } from './upload-files/upload-files.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { WeatherComponent } from './weather/weather.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { ForCastWeatherComponent } from './for-cast-weather/for-cast-weather.component';
import { PaintComponent } from './paint/paint.component';
import { KonvaModule } from 'ng2-konva';


@NgModule({
  declarations: [
    AppComponent,
    GetTodoComponent,
    LoginComponent,
    GetTodoListComponent,
    CreateTodoComponent,
    UpdateTodoComponent,
    ViewTodoComponent,
    CalculateBMIComponent,
    UploadFilesComponent,
    WeatherComponent,
    CurrentWeatherComponent,
    ForCastWeatherComponent,
    PaintComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatProgressBarModule ,
    MatTooltipModule,
    MatIconModule,
    MatSnackBarModule,
    KonvaModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
