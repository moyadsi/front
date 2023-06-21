import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:5000/api'; // URL base de la API

  constructor(private http: HttpClient) { }

  obtenerDetailsPerson(userId: string): Observable<any[]> {
    const url = `${this.apiUrl}/users/details/${userId}`;
    return this.http.get<any[]>(url);
  }
  insertdetailsUsers(id: string, token: string , details: any) {
    console.log('Datos enviados al servidor:', details); // Imprimir los datos antes de enviarlos

    const url = `${this.apiUrl}/users/UpdateDetailsUser/${id}`;
    return this.http.put(url, details )
      .toPromise()
      .then(response => {
        console.log('Detalles del usuario modificados con éxito:', response);
        return response;
      })
      .catch(error => {
        console.error('Error al modificar los detalles del usuario:', error);
        throw error;
      });
  }
  
}
