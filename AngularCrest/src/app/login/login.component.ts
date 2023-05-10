import { Component } from '@angular/core';
import { TodoServiceService } from '../todo-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email:string | undefined;
  password:string |undefined;

  constructor(private td: TodoServiceService , private router:Router){}

  loginForm =new FormGroup({
   
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',Validators.required),
    
  })

  
  onSubmit1()
  {
    this.td.loginUser(this.loginForm.value).subscribe(res =>{
      console.log(res);
      alert("Login Success");
      this.router.navigate(['get-todo-list']);
    },err => {
      alert("You need to register !!!");
    });
  }

}


