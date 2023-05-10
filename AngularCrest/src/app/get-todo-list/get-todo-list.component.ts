import { Component, OnInit } from '@angular/core';
import { TodoServiceService } from '../todo-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-get-todo-list',
  templateUrl: './get-todo-list.component.html',
  styleUrls: ['./get-todo-list.component.css']
})
export class GetTodoListComponent implements OnInit{
    
     siz:any=5;
     pag:any=1;

    // id:String | undefined;
    // todo:String | undefined;
    // description:String | undefined;
    // completed:Boolean |undefined;
    // createdAt:Date | undefined ;
    // updatedAt:Date | undefined;

    // todo: Todo[] | undefined;
  constructor(private todoService : TodoServiceService , private router:Router){

console.log("working");

this.getTodo();
  }
  ngOnInit(): void {
    
  }
allData:any;

  getTodo()
  {
    this.todoService.getTodoList().subscribe(res => {
      console.log(res);
      this.allData=res;
      // this.router.navigate(['create-todo']);
    })
  }

  deleteTodo(id : any)
  {
    console.log(id);
    this.todoService.deleteTodoList(id).subscribe(res =>{
      
    })
    alert("Successfully deleted");
    this.getTodo();
  }

  updateTodo(data:any)
  {
    console.log(data);
    
    this.todoService.updateData=data;
    this.router.navigate(['/update-todo']);
  }

  viewTodo(id:any)
  {
    this.todoService.viewId=id;
    this.router.navigate(['/view-todo']);
  }
  

}
