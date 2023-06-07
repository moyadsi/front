import { Component, OnInit, Renderer2 ,ElementRef  } from '@angular/core';
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
  cursosCategoria: any[] | undefined; // Cursos de la categoría seleccionada
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
  ultimosCursos: any[]| undefined;
  primerosCursos: any[]| undefined;

  constructor(private cursosService: CoursesService, private sanitizer: DomSanitizer, private renderer: Renderer2, private elementRef: ElementRef) { }

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
    this.obtenerCursos(categoria.id); // Obtener los cursos de la categoría seleccionada
  }

  obtenerCursos(idCategoria: string) {
    this.cursosService.obtenerCursos(idCategoria).subscribe(
      (response) => {
        this.cursosCategoria = response.filter(curso => curso.Id === idCategoria).map(curso => {
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

  obtenerAllcourses() {
    this.cursosService.obtenerAllCursos().subscribe(
      (response) => {
        this.cursos = response.map(({ Id: id, NameCourse: name, DescriptionCourse: description, IdTeacher: idTeacher, ImgCourse: imgCourse }) => ({ id, name, description, idTeacher, imgCourse }));
        this.nameCurso = this.cursos[0]?.name;

        // Ordenar los cursos por ID en orden descendente
        this.cursos.sort((a, b) => b.id - a.id);

        // Obtener los últimos 3 cursos
        this.ultimosCursos = this.cursos.slice(0, 5);

        console.log(this.ultimosCursos);

        // Obtener los primeros 3 cursos
        this.primerosCursos = this.cursos.slice(0, 3);

        console.log(this.primerosCursos);
      },
      (error) => {
        console.error(error);
      }
    );
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

  getSafeVideoUrl(): SafeResourceUrl {
    if (!this.urlSeleccionada) {
      return ''; // O cualquier otro valor predeterminado en caso de que no haya URL seleccionada
    }
    const videoUrl = 'https://www.youtube.com/embed/' + this.urlSeleccionada;

    return this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  }

  /*MANEJO BOTON CALIFICACIÓN*/
  counters = [0, 0, 0, 0, 0];
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
  countersCourse = [0, 0, 0, 0, 0];
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

  slideContainerLeft(): void {
    const container = this.elementRef.nativeElement.querySelector('.challenge-container');
    container.style.transform = 'translateX(5%)';
  }  
  slideContainerRight(): void {
    const container = this.elementRef.nativeElement.querySelector('.challenge-container');
    container.style.transform = 'translateX(-180%)';
  }

}
