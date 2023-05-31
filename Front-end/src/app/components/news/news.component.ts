import { Component, OnInit } from '@angular/core';
import { ApiPodcastService } from 'src/app/services/apiPodcast.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})

export class NewsComponent implements OnInit {
  public dataNews: any = {};
  public news: any[] = [];
  public podcast: any = {};
  public podcastItems: any = {};
  public itemsPodcast: any = {};

  constructor(private apiService: ApiService, private apiPodcast: ApiPodcastService) { }

  ngOnInit(): void {
    this.llenarData()
    this.traerPodcast()
  }

  llenarData() {
    this.apiService.getData().subscribe(dataNews => {
      this.dataNews = dataNews;
      console.log(this.dataNews)
    })
  }

  traerPodcast() {
    this.apiPodcast.getDataPodcast().subscribe(podcast => {
      this.podcast = podcast;
      this.podcastItems = this.podcast.data.podcastUnionV2.episodesV2.items
  
    })
  }



}
