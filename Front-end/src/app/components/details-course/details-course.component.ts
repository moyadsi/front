import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-details-course',
  templateUrl: './details-course.component.html',
  styleUrls: ['./details-course.component.css']
})
export class DetailsCourseComponent implements OnInit {

  counters = [0, 0, 0, 0, 0, 0];
  favoriteCount = 0;
  mostrarComponente = false;
  activeSectionIndex: number = -1;
  cursosCategoria: any;
  urlSeleccionada: any;
  descripcionCurso: any;
  duracion: any;
  lenguaje: any;
  valueCourses: any;
  nameCurso: any;


  constructor(private cursosService: CoursesService) { }
  obtenerDetalleCurso(){
    this.obtenerCursos
  }
  obtenerCursos(idCategoria: string) {
    this.cursosService.obtenerCursos(idCategoria).subscribe(
      (response) => {
        this.cursosCategoria = response.filter(curso => curso.Id === Number(idCategoria)).map(curso => {
          return {
            id: curso.Id,
            url: curso.Url,
            tema: curso.NameCourse,
            duracionCourse: curso.durationCourse,
            lenguajeCourse: curso.Lenguaje,
            courseValue: curso.ValueCourse,
            descripcion: curso.DescriptionCourse,
            idteacher: curso.IdTeacher
          };
        });
  
        // Asignar la primera URL a la variable urlSeleccionada de los cursos de la categoría seleccionada
        if (this.cursosCategoria.length > 0) {
          const idTeacher = this.cursosCategoria[0].idteacher; // Obtener el ID del profesor
          this.urlSeleccionada = this.cursosCategoria[0].url;
          this.descripcionCurso = this.cursosCategoria[0].descripcion;
          this.duracion = this.cursosCategoria[0].duracionCourse;
          this.lenguaje = this.cursosCategoria[0].lenguajeCourse;
          this.valueCourses = this.cursosCategoria[0].courseValue;
          this.nameCurso = this.cursosCategoria[0].tema;

          // Llamar a la función obtenerProfesor con el ID del profesor
          this.obtenerProfesor(idTeacher);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
  obtenerProfesor(idTeacher: any) {
    throw new Error('Method not implemented.');
  }


  toggleFavorite(index: number) {
    if (this.counters[index] === 0) {
      this.counters[index]++;
      this.favoriteCount++;
    } else {
      this.counters[index]--;
      this.favoriteCount--;
    }
  }

  setActiveSection(index: number) {
    this.activeSectionIndex = index;
  }
  
  ngOnInit(): void {
  }

}
