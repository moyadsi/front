import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private apiUrl = 'http://localhost:5000/api'; // URL base de la API

  constructor(private http: HttpClient) {}

  obtenerCategorias(): Observable<any[]> {
    const url = `${this.apiUrl}/category`;
    return this.http.get<any[]>(url);
  }

  obtenerCursos(idCategoria: string): Observable<any[]> {
    const url = `${this.apiUrl}/course/?categoria=${idCategoria}`;
    return this.http.get<any[]>(url);
  }

  obtenerProfesor(idProfesor: string): Observable<any[]> {
    const url = `${this.apiUrl}/teacher/${idProfesor}`;
    return this.http.get<any[]>(url);
  }
}