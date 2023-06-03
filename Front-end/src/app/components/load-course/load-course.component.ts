import { Component } from '@angular/core';

@Component({
  selector: 'app-load-course',
  templateUrl: './load-course.component.html',
  styleUrls: ['./load-course.component.css']
})
export class LoadCourseComponent {
   colorDiamont : number = 1;
   colorText : number = 1;
   textoBoton = 'chevron-right';


  nextStep() {
    if(this.colorDiamont == 2 || this.colorText == 2 ){
      this.textoBoton = ' none'
    }
    if(this.colorDiamont == 3 || this.colorText == 3 ){
      this.colorDiamont = 1
      this.colorText = 1
      this.textoBoton = 'chevron-right'
      return
    }
    this.colorDiamont++
    this.colorText++
  }

  previousStep() {
    if(this.colorDiamont == 1 || this.colorText == 1){
      this.colorDiamont = 1
      this.colorText = 1
      return
    }
        this.textoBoton = 'chevron-right'
        this.colorDiamont--
        this.colorText--
  }

  onFileSelected(event: any) {
  const file: File = event.target.files[0];
  // Aquí puedes realizar operaciones con el archivo seleccionado
}


  
}
