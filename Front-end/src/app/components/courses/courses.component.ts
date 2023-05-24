import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  constructor() { }

      /*MANEJO BOTON CALIFICACIÓN*/
      counters= [0,0,0,0,0];
      qualification = 0;
    
      toggleQualification(index: number) {
        if (this.counters[index] === 0) {
          this.counters[index]++;
          this.qualification++;
        } else {
          this.counters[index]--;
          this.qualification--;
        }
      
    }
          /*MANEJO BOTON CALIFICACIÓN CURSO*/
          countersCourse= [0,0,0,0,0];
          qualificationCourse = 0;
        
          toggleCourse(index: number) {
            if (this.countersCourse[index] === 0) {
              this.countersCourse[index]++;
              this.qualificationCourse++;
            } else {
              this.countersCourse[index]--;
              this.qualificationCourse--;
            }
          
        }
  ngOnInit(): void {
  }

}
