import { Component } from '@angular/core';
@Component({
  selector: 'app-load-course',
  templateUrl: './load-course.component.html',
  styleUrls: ['./load-course.component.css']
})


export class LoadCourseComponent  {

  colorDiamont : number = 1;
  colorText : number = 1;
  numberClass : number  = 1
  textoBoton = 'chevron-right';
  arrayModulos : any[] = [];
  arrayClases : any[] = [];


   nextStep() {
     if(this.colorDiamont == 2 || this.colorText == 2 ){
       this.createElementModule() 
       this.textoBoton = ' none'
      }
      if(this.colorDiamont == 3 || this.colorText == 3 ){
          this.colorDiamont = 1
          this.colorText = 1
          this.textoBoton = 'chevron-right'
          return
      }
        const containerForm: any = document.getElementById("containerForm") 
        containerForm.style.marginLeft = '-'+this.colorDiamont+'00%';
      this.colorDiamont++
      this.colorText++
  }

  previousStep() {
    const containerForm: any = document.getElementById("containerForm") 
    if(this.colorDiamont == 3 || this.colorText == 3){
      containerForm.style.marginLeft = '-100%';
    }

    if(this.colorDiamont == 2 || this.colorText == 2){
      containerForm.style.marginLeft = '0';
    }
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
  if (file) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const fileContent = e.target.result;
      console.log(fileContent)
        const myElement = document.getElementById("uploadImage");
        console.log(myElement)
        let img = document.createElement("img")
          img.src = fileContent
          myElement?.appendChild(img)
      };
      reader.readAsText(file);
    }
  }

  createElementModule(){
    const nameModule: any = document.getElementById("nameModule")


    
    let dataModulos = {
      "nombreModulo" : nameModule.value
    }
    
    this.arrayModulos.push(dataModulos)

    nameModule.value = ""

  }

  createOneClass(){

    const nombreClase: any = document.getElementById("nombreClase")

    const urlClase: any = document.getElementById("urlClase")

    let dataClase = {
      "nombreClase" : nombreClase.value,
      "urlClase": urlClase.value
    }

    this.arrayClases.push(dataClase)

    nombreClase.value = ""
    urlClase.value = ""

  }

  saveModule(){
    const classDiv: any = document.querySelector("oneClass")
    const nameModule: any = document.getElementById("nameModule")

    let dataModulo = {
      "nombreModulo" : nameModule.value,
      "clases" : this.arrayClases
    }

    this.arrayModulos.push(dataModulo)
  }

  newModule(){
    const classDiv: any = document.getElementById("class")

    classDiv.removeChild()
  }
}
