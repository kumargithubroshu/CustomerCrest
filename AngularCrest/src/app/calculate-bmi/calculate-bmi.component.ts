import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-calculate-bmi',
  templateUrl: './calculate-bmi.component.html',
  styleUrls: ['./calculate-bmi.component.css']
})
export class CalculateBMIComponent {

  weight: number | undefined;
  height: number | undefined;
  bmi: number | undefined;
  weightCategory: string | undefined;
  calBmi: number | undefined;

  

  bmiCal = new FormGroup({
    weight:new FormControl(),
    height:new FormControl()
    // bmi:new FormControl()
  }) 
  

  calculateBMI() {
    const heightMeters = this.bmiCal.value.height/100;
     this.calBmi = this.bmiCal.value.weight / (heightMeters * heightMeters);
    this.bmi=Math.round(this.calBmi * 10) / 10;
    if (this.bmi < 18.5) {
      this.weightCategory = 'Underweight';
      alert("You are : "+this.weightCategory );
    } else if (this.bmi >= 18.5 && this.bmi < 25) {
      this.weightCategory = 'Normal';
      alert("You are : "+this.weightCategory );
    } else if (this.bmi >= 25 && this.bmi < 30) {
      this.weightCategory = 'Overweight';
      alert("You are : "+this.weightCategory );
    } else {
      this.weightCategory = 'Obese';
      alert("You are : "+this.weightCategory );
    }
  
  }

  

}
