import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private apiUrl ='http://localhost:5000/api/'
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  

}
