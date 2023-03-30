import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private urlApi = 'https://newsapi.org/v2/everything?q=apple&from=2023-03-29&to=2023-03-29&sortBy=popularity&apiKey=d5928f3b929445a986aa4eb8f3d4ddc4';

  constructor(private http: HttpClient) { }

  public getData() : Observable<any>{

    return this.http.get<any>(this.urlApi);
  }
}
