import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  nombreCategoria: any;
  nombreCurso: any;
  cursos: any[] | undefined;
  allCursos: any[] | undefined;
  profesores: any[] | undefined;
  public url: string = '';
  idCategoriaSeleccionada: any;
  idCursoSeleccionado: any;
  descripcionCurso: any;
  nameCurso: any;
  duracion: any;
  lenguaje: any;
  valueCourses: any;
  nombreProfeSeleccionado: any;
  experienciaSeleccionada: any;
  profesionSeleccionada: any;
  categorias: { id: any; nombre: any; }[] | undefined;
  urlSeleccionada: string | undefined;
  public videoUrl: SafeResourceUrl | undefined;


  constructor(private cursosService: CoursesService, private sanitizer: DomSanitizer) { }

 /*OBTENER INFORMACION DE LOS CURSOS */
 obtenerCursos(idCategoria: string) {
  this.cursosService.obtenerCursos(idCategoria).subscribe(
    (response) => {
      this.cursos = response.filter(curso => curso.Id=== idCategoria).map(curso => {
        return {
          id: curso.Id,
          url: curso.Url,
          tema: curso.NameCourse,
          duracionCourse: curso.durationCourse,
          lenguajeCourse: curso.Lenguaje,
          courseValue : curso.ValueCourse,
          descripcion: curso.DescriptionCourse,
          idteacher: curso.IdTeacher
        };
      });

      // Asignar la primera URL a la variable urlSeleccionada
      if (this.cursos.length > 0) {
        const idTeacher = this.cursos[0].idteacher; // Obtener el ID del profesor
        this.urlSeleccionada = this.cursos[0].url;
        this.descripcionCurso = this.cursos[0].descripcion;
        this.duracion = this.cursos[0].duracionCourse;
        this.lenguaje = this.cursos[0].lenguajeCourse;
        this.valueCourses = this.cursos[0].courseValue;
        this.nameCurso = this.cursos[0].tema;

        // Llamar a la función obtenerProfesor con el ID del profesor
        this.obtenerProfesor(idTeacher);

      }
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

  return this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
}
obtenerProfesor(idTeacher: string) {
  this.cursosService.obtenerProfesor(idTeacher).subscribe(
    (response) => {
      if (response.length > 0) {
        const primerProfesor = response[0];
        this.nombreProfeSeleccionado = primerProfesor.Name;
        this.experienciaSeleccionada = primerProfesor.Experience;
        this.profesionSeleccionada = primerProfesor.Profesion;
      }

      this.profesores = response;
    },
    (error) => {
      console.error(error);
    }
  );
}

/*TODOS LOS CURSOS*/


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
    this.obtenerCategorias();
    this.obtenerAllcourses();
  }
  obtenerCategorias() {
    this.cursosService.obtenerCategorias().subscribe(
      (response) => {
        this.categorias = response.map(({ Id_Category: id, NameCategory: nombre }) => ({ id, nombre }));
        this.nombreCategoria = this.categorias[0]?.nombre; // Asignar el valor del primer elemento de la categoría al nombreCategoria
      },
      (error) => {
        console.error(error);
      }
    );
  }

  obtenerNombreCategoria(categoria: any): void {
    this.nombreCategoria = categoria.nombre;
    this.idCategoriaSeleccionada = categoria.id;
  }

  obtenerAllcourses(){
    this.cursosService.obtenerAllCursos().subscribe(
      (response) => {
        this.cursos = response.map(({ Id: id, NameCourse: name, DescriptionCourse: description, IdTeacher: idTeacher, ImgCourse: imgCourse }) => ({ id, name, description, idTeacher, imgCourse }));
        this.nameCurso = this.cursos[0]?.nombre; // Asignar el valor del primer elemento de la categoría al nombreCategoria
        console.log(this.cursos);
      },
      (error)=>{
        console.error
      }
    )
    
  }
  obtenerAllCourses(courses: any): void {
    this.nombreCurso = courses.nombre;
    this.idCursoSeleccionado = courses.id;
  }
}
