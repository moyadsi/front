import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';
import { ActivatedRoute } from '@angular/router';


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

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idCurso = params.get('idCurso');
      if (idCurso) {
        this.obtenerCursos(idCurso); // Llama a la función obtenerCursos con el ID del curso
      }
      console.log(idCurso);
    });
  }
  
  constructor(private cursosService: CoursesService, private route: ActivatedRoute) { }
  
  obtenerCursos(idCurso: string) {
    this.cursosService.obtenerCursos(idCurso).subscribe(
      (response) => {
        this.cursosCategoria = response.filter(curso => curso.Id === Number(idCurso)).map(curso => {
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
  
        if (this.cursosCategoria.length > 0) {
          const idTeacher = this.cursosCategoria[0].idteacher;
          this.urlSeleccionada = this.cursosCategoria[0].url;
          this.descripcionCurso = this.cursosCategoria[0].descripcion;
          this.duracion = this.cursosCategoria[0].duracionCourse;
          this.lenguaje = this.cursosCategoria[0].lenguajeCourse;
          this.valueCourses = this.cursosCategoria[0].courseValue;
          this.nameCurso = this.cursosCategoria[0].tema;
  
        }
      },
      (error) => {
        console.error(error);
      }
    );
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
  

}
