import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-news',
  templateUrl:'./news.component.html',
  styleUrls: ['./news.component.css']
})

export class NewsComponent implements OnInit {
  public data: any = {} ;
  public news: any[] = [];
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.llenarData()
  }

  llenarData(){
    this.apiService.getData().subscribe(data =>{
      this.data = data;
      this.news = this.data.articles
      console.log(this.news)
    })
  }
}
