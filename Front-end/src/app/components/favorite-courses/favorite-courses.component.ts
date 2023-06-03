import { Component, OnInit } from '@angular/core';
//import axios from 'axios';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-favorite-courses',
  templateUrl: './favorite-courses.component.html',
  styleUrls: ['./favorite-courses.component.css']
})
export class FavoriteCoursesComponent implements OnInit {
  nombreCategoria: any;
  cursos: any[] | undefined;
  profesores: any[] | undefined;
  public url: string = '';
  idCategoriaSeleccionada: any;
  descripcionCurso: any;
  nombreProfeSeleccionado: any;
  experienciaSeleccionada: any;
  profesionSeleccionada: any;


  constructor( private http: HttpClient, private sanitizer: DomSanitizer) { }

  /*MOSTRAR CATEGORIAS*/
  obtenerCategorias() {
    this.http.get<any[]>('http://localhost:5000/api/category').subscribe(
      (response) => {
        this.categorias = response.map(({ Id_Category: id, NameCategory: nombre }) => ({ id, nombre }));
        this.nombreCategoria = this.categorias[0]?.nombre; // Asignar el valor del primer elemento de la categoría al nombreCategoria
      console.log(this.categorias)
      },
      (error) => {
        console.error(error);
      }
    );
  }


public videoUrl: SafeResourceUrl | undefined;

  obtenerNombreCategoria(categoria: any): void {
    this.nombreCategoria = categoria.nombre;
    this.idCategoriaSeleccionada = categoria.id;
  }
  /*OBTENER CURSO DESCRIPCION Y URL DE VIDEO SEGUN LA CATEGORIA*/
  
// Declara una variable de clase para almacenar la URL
// Declara una variable de clase para almacenar la URL
public urlSeleccionada: string = '';

obtenerCursos(idCategoria: string) {
  const url = `http://localhost:5000/api/course/?categoria=${idCategoria}`;

  this.http.get<any[]>(url).subscribe(
    (response) => {
      this.cursos = response.filter(curso => curso.Id=== idCategoria).map(curso => {
        return {
          id: curso.Id,
          url: curso.Url,
          descripcion: curso.DescriptionCourse,
          idteacher: curso.IdTeacher
        };
      });

      // Asignar la primera URL a la variable urlSeleccionada
      if (this.cursos.length > 0) {
        const idTeacher = this.cursos[0].idteacher; // Obtener el ID del profesor
        this.urlSeleccionada = this.cursos[0].url;
        this.descripcionCurso = this.cursos[0].descripcion;

        // Llamar a la función obtenerProfesor con el ID del profesor
        this.obtenerProfesor(idTeacher);
      }

      console.log(this.cursos);
    },
    (error) => {
      console.error(error);
    }
  );
}

getSafeVideoUrl(): SafeResourceUrl {
  if (!this.urlSeleccionada) {
    return ''; // O cualquier otro valor predeterminado en caso de que no haya URL seleccionada
  }
  const videoUrl = 'https://www.youtube.com/embed/' + this.urlSeleccionada;
  console.log(videoUrl)

  return this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
}


/*OBTENER PROFESOR*/


obtenerProfesor(idTeacher: string) {
  const url = `http://localhost:5000/api/teacher/${idTeacher}`;
  this.http.get<any[]>(url).subscribe(
    (response) => {
      if (response.length > 0) {
        const primerProfesor = response[0];
        this.nombreProfeSeleccionado = primerProfesor.Name;
        this.experienciaSeleccionada = primerProfesor.Experience;
        this.profesionSeleccionada = primerProfesor.Profesion;
      }

      this.profesores = response;
      console.log(this.profesores);
    },
    (error) => {
      console.error(error);
    }
  );
}
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
    categorias: any[] = [];

  ngOnInit(): void {
    this.obtenerCategorias();
  }



}
