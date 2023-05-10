import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoServiceService } from '../todo-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-todo',
  templateUrl: './get-todo.component.html',
  styleUrls: ['./get-todo.component.css']
})
export class GetTodoComponent {

  name:string | undefined;
  email:string | undefined;
  password: string | undefined;

  constructor(private tds:TodoServiceService, private router:Router){}

  registerForm =new FormGroup({
    name:new FormControl('',[Validators.required,Validators.maxLength(30),Validators.pattern(/^[A-Za-z]+$/)]),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.pattern(/[0-9]/),Validators.maxLength(6)]),
    conPassword:new FormControl('',Validators.required)
  })
  

  onSubmit()
  {
    if(this.registerForm.value.password != this.registerForm.value.conPassword)
    {
      alert("password should be matched")
    }
    else
    {
    this.tds.createUser(this.registerForm.value).subscribe(res => {
      console.log(res);
      alert("Registered Success");
      this.router.navigate(['/login']);
    },err=>{
      alert("email already exist");
      this.router.navigate(['/login']);
    })
  
    }
    
  }

}
