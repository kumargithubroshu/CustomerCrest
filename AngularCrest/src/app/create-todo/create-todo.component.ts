import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoServiceService } from '../todo-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css']
})
export class CreateTodoComponent {
  
     

    id:String | undefined;
    todo:String | undefined;
    description:String | undefined;
    completed:Boolean |undefined;

    // todo :Todo=new Todo();

    constructor(private tps: TodoServiceService , private router:Router, private snackBar: MatSnackBar){
    
    }

    createForm =new FormGroup
  ({
  id:new FormControl('',Validators.required),
  todo:new FormControl('',Validators.required),
  description:new FormControl('',Validators.required),
  completed:new FormControl('',Validators.required)
  // createdAt:new FormControl(),
  // updatedAt:new FormControl()
  })

  onSubmit3(){
    
      this.tps.createTodoList(this.createForm.value).subscribe(res =>{
        console.log(res);
         this.router.navigate(['/get-todo-list']);
      },err => {
        this.snackBar.open('Todo already exist !!!', 'Close');
        // alert("id already exist");
        this.router.navigate(['/get-todo-list']);
      });
  }
  
}


  

