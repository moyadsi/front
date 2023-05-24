import { Component, OnInit } from '@angular/core';
import { ApiPodcastService } from 'src/app/apiPodcast.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-details-news',
  templateUrl: './details-news.component.html',
  styleUrls: ['./details-news.component.css']
})
export class DetailsNewsComponent implements OnInit {
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
      this.news = this.dataNews.articles
      console.log(this.news)
    })
  }

  traerPodcast() {
    this.apiPodcast.getDataPodcast().subscribe(podcast => {
      this.podcast = podcast;
      this.podcastItems = this.podcast.data.podcastUnionV2.episodesV2.items
  
    })
  }

}
