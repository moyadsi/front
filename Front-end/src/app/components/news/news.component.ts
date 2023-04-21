import { Component, OnInit } from '@angular/core';
import { ApiPodcastService } from 'src/app/apiPodcast.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-news',
  templateUrl:'./news.component.html',
  styleUrls: ['./news.component.css']
})

export class NewsComponent implements OnInit {
  public dataNews: any = {} ;
  public news: any[] = [];
  public podcast: any[] = [];
  constructor(private apiService: ApiService, private apiPodcast: ApiPodcastService) { }

  ngOnInit(): void {
    this.llenarData()
    this.traerPodcast()
  }

  llenarData(){
    this.apiService.getData().subscribe(dataNews =>{
      this.dataNews = dataNews;
      this.news = this.dataNews.articles
    })
  }

  traerPodcast(){
    this.apiPodcast.getDataPodcast().subscribe(podcast =>{
      this.podcast = podcast;
      console.log(podcast)
      // this.podcast = this.data.articles
      // console.log(this.podcast)
    })
  }
}
