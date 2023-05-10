import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './todo';




@Injectable({
  providedIn: 'root'
})


export class TodoServiceService {

  updateData:any;

  viewId: any;

  baseURL="http://localhost:8080/user";

  baseURL1="http://localhost:8080/login";

  baseURL2="http://localhost:8080/todos";

   Url = "http://localhost:8080/uploadFile";

   Url1="http://localhost:8080/getFile";

   Url2 = "http://localhost:8080/download-files";

   Url3 = "http://localhost:8080/uploadFiles";

   apiUrl = 'http://localhost:8080';


  constructor(private httpClient : HttpClient) { }

  createUser(user : any)
  {
    return this.httpClient.post(`${this.baseURL}`,user);
  }

  loginUser(user : any)
  {
    return this.httpClient.post(`${this.baseURL1}`,user);
  }

  getTodoList() 
  {
    return this.httpClient.get<Todo>(`${this.baseURL2}`);
  }

  createTodoList(todo : any)
  {
    return this.httpClient.post<Todo>(`${this.baseURL2}`, todo);
  }

  deleteTodoList(id:any)
  {
    // return this.httpClient.delete<Todo>("baseURL2/"+id);
    return this.httpClient.delete(`${this.baseURL2}/${id}`);
  }

  updateTodoList(id : any, todo : any)
  {
    return this.httpClient.put(`${this.baseURL2}/${id}`, todo);
  }

  getTodoById(id:any)
  {
    return this.httpClient.get<Todo>(`${this.baseURL2}/${id}`); 
  }

  //for files

  uploadFile(file: File) :Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post<any>(`${this.Url}`, formData, {});
  }

  getFiles() :Observable<any>{
    return this.httpClient.get(`${this.Url1}`);
  }

  deleteFile(id: any) {
    return this.httpClient.delete(`${this.Url2}/${id}`);
  }

// for weather
getWeather(city: string): Observable<any> {
  // const url = this.apiUrl + city;
  return this.httpClient.get<any>(`${this.apiUrl}/weather/${city}`);
}

getData()
  {
    return this.httpClient.get(`${this.apiUrl}/humid`);
  }


  // for first static weather
  getWeatherApi(): Observable<any>
  {
     return this.httpClient.get<any>(`${this.apiUrl}/current`);
  }

  // for second static weather
  getAWeatherApi(): Observable<any>
  {
     return this.httpClient.get<any>(`${this.apiUrl}/currentSecond`);
  }
  
  // for third static weather
  getBWeatherApi(): Observable<any>
  {
     return this.httpClient.get<any>(`${this.apiUrl}/currentThird`);
  }

  getAllBWeather()
  {
    return this.httpClient.get(`${this.apiUrl}/detailsThird`);
  }

}























  // uploadFiles(files: File[]): Observable<any> {
  //   const formData = new FormData();
  //   for (let i = 0; i < files.length; i++) {
  //     formData.append('files', files[i]);
  //   }
  //   return this.httpClient.post(`${this.Url3}`, formData, {} );
  // }

// formData.append('file', user | JSON.stringify);

  // downloadFile(): Observable<Blob> {
  //   return this.http.get(`${this.Url1}`, { responseType: 'blob' });
  // }
  


