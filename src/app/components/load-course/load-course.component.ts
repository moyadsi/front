import { Component } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';
@Component({
  selector: 'app-load-course',
  templateUrl: './load-course.component.html',
  styleUrls: ['./load-course.component.css']
})


export class LoadCourseComponent {
  
  colorDiamont: number = 1;
  colorText: number = 1;
  numberClass: number = 1
  textoBoton = 'chevron-right';
  arrayModulos: any[] = [];
  arrayCursos : any = {};
  arrayClases: any[] = [];
  editableFields: boolean[] = [];
  categoryes: any[] = [];;
  courseName: any;
  courseDescription: any;


  constructor (private cursosService: CoursesService) {}

  ngOnInit(): void {
    this.loadCategorys()
  }

  nextStep() {
    if (this.colorDiamont == 2 || this.colorText == 2) {
      this.textoBoton = ' none'
    }
    if (this.colorDiamont == 3 || this.colorText == 3) {
      this.colorDiamont = 1
      this.colorText = 1
      this.textoBoton = 'chevron-right'
      return
    }
    const containerForm: any = document.getElementById("containerForm")
    containerForm.style.marginLeft = '-' + this.colorDiamont + '00%';
    this.colorDiamont++
    this.colorText++
    this.saveInfoCourse()
  }

  previousStep() {
    const containerForm: any = document.getElementById("containerForm")
    if (this.colorDiamont == 3 || this.colorText == 3) {
      containerForm.style.marginLeft = '-100%';
    }

    if (this.colorDiamont == 2 || this.colorText == 2) {
      containerForm.style.marginLeft = '0';
    }
    if (this.colorDiamont == 1 || this.colorText == 1) {
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
        const myElement = document.getElementById("uploadImage");
        let img = document.createElement("img")
        img.src = fileContent
        myElement?.appendChild(img)
      };
      reader.readAsText(file);
    }
  }

  createOneClass() {

    const nombreClase: any = document.getElementById("nombreClase")

    const urlClase: any = document.getElementById("urlClase")

    const nameModule: any = document.getElementById("nameModule")

    if (nameModule.value == "") {
      alert("Por favor dale un nombre al modulo")
    }else{
      if (nombreClase.value != "" && urlClase.value != "") {
        let dataClase = {
          "nombreClase": nombreClase.value,
          "urlClase": urlClase.value
        }
        this.arrayClases.push(dataClase)
        nombreClase.value = ""
        urlClase.value = ""

      } else {
        alert("Por favor completa los campos de la clase")
      }
  }

  }

  clearClass(){
    const classDiv: any = document.getElementById("class")
    const nameModule: any = document.getElementById("nameModule")

    console.log(classDiv)
    if (nameModule.value == "") {
      if (classDiv.childNodes.length > 1) {
        this.arrayClases = [];
      }
    }
  }



  saveModule() {
    const classDiv: any = document.getElementById("class")
    const nameModule: any = document.getElementById("nameModule")
    if (nameModule.value != "") {
      if (classDiv.childNodes.length > 1){

        let dataModulo = {
          "nombreModulo": nameModule.value,
          "clases": this.arrayClases
        }
        this.arrayModulos.push(dataModulo)
        nameModule.value = "";
        this.arrayClases = [];

      }else{ 
        alert("Por favor completa los campos de la clase")
      }
    } else {
      alert("Por favor dale un nombre al modulo")
    }
  }

  loadInfoCourse(index){

    this.arrayClases = this.arrayModulos[index].clases

    const divModule: any = document.getElementById("modules")

    divModule.childNodes[0].removeAttribute("readonly")

    this.editableFields[index] = !this.editableFields[index];
  
  }

  saveInfoCourse(){
    this.courseName = document.getElementById("courseName")
    this.courseDescription = document.getElementById("courseDescription")

    this.arrayCursos= [
      {
        "cursoNombre": this.courseName.value,
        "cursoDescripcion": this.courseDescription.value,
        "modulos" : this.arrayModulos
      }
    ]
    console.log(this.arrayCursos)
  }

  loadCategorys(){
    this.cursosService.obtenerCategorias().subscribe(
      (response) => {
        console.log(response)
        this.categoryes = response;
        console.log(this.categoryes)
      },
      (error) => {
        console.error(error);
      }
    )}
}
