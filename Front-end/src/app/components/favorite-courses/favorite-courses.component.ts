import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorite-courses',
  templateUrl: './favorite-courses.component.html',
  styleUrls: ['./favorite-courses.component.css']
})
export class FavoriteCoursesComponent implements OnInit {

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

  ngOnInit(): void {
  }

}
