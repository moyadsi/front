import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

   private urlApi = 'http://localhost:5000/api/Noticies/GetNoticie';

  constructor(private http: HttpClient) { }

  public getData() : Observable<any>{
    return this.http.get<any>(this.urlApi);
  }
}
