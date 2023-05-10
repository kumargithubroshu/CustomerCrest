import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TodoServiceService } from '../todo-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-todo',
  templateUrl: './update-todo.component.html',
  styleUrls: ['./update-todo.component.css']
})
export class UpdateTodoComponent {

    // id:String | undefined;
    // todo:String | undefined;
    // description:String | undefined;
    // completed:Boolean |undefined;
      data:any;


    constructor(private tmp : TodoServiceService , private router:Router){


this.data=this.tmp.updateData;
console.log(this.data);
this.updateForm.setValue(this.data);

    }

    updateForm =new FormGroup ({
    id:new FormControl(''),
    todo:new FormControl(''),
    description:new FormControl(''),
    completed:new FormControl(''),
    createdAt:new FormControl(),
    updatedAt:new FormControl()
  })

  onSubmit4()
  {
    
    this.tmp.updateTodoList(this.updateForm.value.id,this.updateForm.value).subscribe(res =>{
    });
    alert("your fields updated");
    this.router.navigate(['/get-todo-list']);
  }

}
