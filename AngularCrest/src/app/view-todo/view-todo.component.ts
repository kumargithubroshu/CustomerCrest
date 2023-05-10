import { Component, OnInit } from '@angular/core';
import { TodoServiceService } from '../todo-service.service';


@Component({
  selector: 'app-view-todo',
  templateUrl: './view-todo.component.html',
  styleUrls: ['./view-todo.component.css']
})
export class ViewTodoComponent implements OnInit{
 
  data:any;
  viewData:any
  constructor(private ser : TodoServiceService){
    this.data=this.ser.viewId;
    console.log(this.data);
  }
  ngOnInit(): void {
   this.checkTodo();
  }
 
    checkTodo()
    {
      this.ser.getTodoById(this.data).subscribe(res => {
         console.log(res);
         this.viewData=res;
      })
    }


}
