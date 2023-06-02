import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

   private urlNew = 'http://localhost:5000/api/noticies/';


  constructor(private http: HttpClient) { }

  public getData() : Observable<any>{
    return this.http.get<any>(this.urlNew);
  }

  public getnewById() : Observable<any>{
    return this.http.get<any>(`${this.urlNew}`);
  }
}
