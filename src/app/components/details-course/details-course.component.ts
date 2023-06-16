import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


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
  cursos: { id: any; name: any; description: any; idTeacher: any; duracion: any; imgCourse: any; }[] | undefined;
  ultimosCursos: { id: any; name: any; description: any; idTeacher: any; duracion: any; imgCourse: any; }[] | undefined;
  profesores: { Id_Teacher: any; name: any; Profesion: any; Experience: any; }[] | undefined;
  nombreProfeSeleccionado: any;
  experienciaSeleccionada: any;
  profesionSeleccionada: any;
  detallesCurso: { Id: any; IdCourse: any; NameCourses: any; DescriptionCourses: any; Duration: any; UrlVideo: any; }[] | undefined;
  contenidoCurso: { Id: any; IdCourse: any; NameCourses: any; DescriptionCourses: any; Duration: any; UrlVideo: any; }[] | undefined;
  filesCurso: { Id: any; IdCourse: any; NameFile: any; UrlFile: any; }[] | undefined;
  linksCurso: { Id: any; IdCourse: any; NameLink: any; UrlLink: any; }[] | undefined;
  comentsCurso: { Id: any; IdCourse: any; comments: any; PersonFullName: any; likeComments:any }[] | undefined;

  ngOnInit(): void {
    this.obtenerAllcourses();
    this.route.paramMap.subscribe(params => {
      const idCurso = params.get('idCurso');
      if (idCurso) {
        this.obtenerCursos(idCurso); // Llama a la función obtenerCursos con el ID del curso
        this.obtenerDetallesCurso(idCurso);
        this.obtenerFilesCurso(idCurso);
        this.obtenerLinksCurso(idCurso);
        this.obtenerComentariosCurso(idCurso);
      }
    });
  }
  
  constructor(private cursosService: CoursesService, private route: ActivatedRoute, private sanitizer: DomSanitizer) { }
  
  obtenerCursos(idCurso: string) {
    this.cursosService.obtenerCursos(idCurso).subscribe(
      (response) => {
        // Obtener los detalles del curso actual
        const cursoActual = response.find(curso => curso.Id === Number(idCurso));
  
        if (cursoActual) {
          const idTeacher = cursoActual.IdTeacher;
          this.urlSeleccionada = cursoActual.Url;
          this.descripcionCurso = cursoActual.DescriptionCourse;
          this.duracion = cursoActual.durationCourse;
          this.lenguaje = cursoActual.Lenguaje;
          this.valueCourses = cursoActual.ValueCourse;
          this.nameCurso = cursoActual.NameCourse;
          this.obtenerProfesor(idTeacher);
  
          // Obtener los detalles adicionales del curso
          this.obtenerDetallesCurso(cursoActual.IdCourse);
          this.obtenerDetallesCurso (idCurso);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  detallesCargados: boolean = false; // Variable para controlar la visibilidad de los detalles del curso

  
  obtenerDetallesCurso(idCurso: string) {
    this.cursosService.obtenerDetailsCurso(idCurso).subscribe(
      (response) => {
        this.detallesCurso = response.map(({ Id, IdCourse, NameCourses, DescriptionCourses, Duration, UrlVideo }) => ({ Id, IdCourse, NameCourses, DescriptionCourses, Duration, UrlVideo }));
  
        // Obtener el ID del detalle del curso
        const idDetalleCurso = this.detallesCurso[0]?.Id;
  
        // Llamar a la función obtenerContentCurso con el ID del detalle del curso
        if (idDetalleCurso) {
          this.obtenerContentCurso(idDetalleCurso);
        }
  
        this.detallesCargados = true; // Establece detallesCargados a true una vez que los detalles se hayan cargado
      },
      (error) => {
        console.error(error);
      }
    );
  }
  /* CONTENIDO DEL CURSO*/
  obtenerContentCurso(idDetalleCurso: string) {
    this.cursosService.obtenerContentCurso(idDetalleCurso).subscribe(
      (response) => {
        this.contenidoCurso = response.map(({ Id_Content, IdDetailsCourses, Duration, DescriptionClass, Url }) => ({
          Id: Id_Content,
          IdCourse: IdDetailsCourses,
          NameCourses: null,
          DescriptionCourses: DescriptionClass,
          Duration,
          UrlVideo: Url
        }));
  
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  obtenerFilesCurso(idCurso: string) {
    this.cursosService.obtenerFilesCurso(idCurso).subscribe(
      (response) => {
        const cursoActual = response.find(filesCurso => filesCurso.IdCourse === parseInt(idCurso));
        if(cursoActual){
          this.filesCurso = response.map(({ Id, IdCourse, NameFile,  UrlFile }) => ({ Id, IdCourse, NameFile, UrlFile }));
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  obtenerLinksCurso(idCurso: string) {
    this.cursosService.obtenerLinksCurso(idCurso).subscribe(
      (response) => {
        const cursoActual = response.find(filesCurso => filesCurso.IdCourse === parseInt(idCurso));
        if (cursoActual){
          this.linksCurso = response.map(({ Id, IdCourse, NameLink,  UrlLink }) => ({ Id, IdCourse, NameLink, UrlLink }));
          console.log(response);
        }
        console.log("entro")
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  /*COMENTARIOS CURSO*/
  obtenerComentariosCurso(idCurso: string) {
    this.cursosService.obtenerComentsCurso(idCurso).subscribe(
      (response) => {
        const cursoActual = response.find(comentsCurso => comentsCurso.IdCourse === parseInt(idCurso));
        if (cursoActual){
          this.comentsCurso = response.map(({ Id, IdCourse, comments,  PersonFullName ,likeComments }) => ({ Id, IdCourse, comments, PersonFullName , likeComments }));
          console.log(response);
        }
        console.log("entro")
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  obtenerAllcourses() {
    this.cursosService.obtenerAllCursos().subscribe(
      (response) => {
        this.cursos = response.map(({ Id: id, NameCourse: name, DescriptionCourse: description, IdTeacher: idTeacher, ImgCourse: imgCourse , durationCourse: duracion}) => ({ id, name, description, idTeacher, duracion, imgCourse}));
        this.nameCurso = this.cursos[0]?.name;

        // Ordenar los cursos por ID en orden descendente
        this.cursos.sort((a, b) => b.id - a.id);

        // Obtener los últimos 3 cursos
        this.ultimosCursos = this.cursos.slice(0, 4);

 
      },
      (error) => {
        console.error(error);
      }
    );
  }

  obtenerProfesor(idTeacher: string) {
    this.cursosService.obtenerProfesor(idTeacher).subscribe(
      (response) => {
        const profesor = response.find((profesor) => profesor.Id_Teacher === Number(idTeacher)); // Filtrar el arreglo de respuesta
  
        if (profesor) {
          this.profesores = [{
            Id_Teacher: profesor.Id_Teacher,
            name: profesor.Name,
            Profesion: profesor.Profesion,
            Experience: profesor.Experience
          }];
  
          this.nombreProfeSeleccionado = profesor.Name;
          this.experienciaSeleccionada = profesor.Experience;
          this.profesionSeleccionada = profesor.Profesion;
        } 

      },
      (error) => {
        console.error(error);
      }
    );
  }
  toggleFavorite(index: number) {
    if (index !== this.activeCommentIndex) {
      if (this.counters[index] === 0) {
        this.counters[index]++;
        this.favoriteCount++;
      } else {
        this.counters[index]--;
        this.favoriteCount--;
      }
    }
  }
  activeCommentIndex: number = -1;

  setActiveSection(index: number) {
    this.activeCommentIndex = index;
  }
  
  
getSafeVideoUrl(): SafeResourceUrl {
  if (!this.urlSeleccionada) {
    return '';
  }
  const videoUrl = 'https://www.youtube.com/embed/' + this.urlSeleccionada;
  return this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
}


detalleCursoSeleccionado: any;
mostrarClases = false;
  toggleMostrarClases(idDetalleCurso: any) {
    this.detalleCursoSeleccionado = idDetalleCurso;
    this.mostrarClases = !this.mostrarClases;
    if (this.mostrarClases) {
      this.obtenerContentCurso(idDetalleCurso);
    }
  }

  obtenerUrlVideo(clase: any) {
    this.urlSeleccionada = clase.UrlVideo;
  }
  
  getFileExtension(url: string): string {
    const parts = url.split('.');
    return parts[parts.length - 1];
  }
  
}

