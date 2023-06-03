import { Component } from '@angular/core';

@Component({
  selector: 'app-load-course',
  templateUrl: './load-course.component.html',
  styleUrls: ['./load-course.component.css']
})
export class LoadCourseComponent {
   currentStep: number = 1;

  nextStep() {
    this.currentStep++;
  }

  previousStep() {
    this.currentStep--;
  }
}
