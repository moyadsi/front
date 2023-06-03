import { Component, OnInit } from '@angular/core';
import { ApiPodcastService } from 'src/app/services/apiPodcast.service';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-details-news',
  templateUrl: './details-news.component.html',
  template: 'El ID de la noticia es: {{ _id }}',
  styleUrls: ['./details-news.component.css']
})
export class DetailsNewsComponent implements OnInit {
  _id: string = "";
  public news: any = "";
  public podcast: any = {};
  public podcastItems: any = {};


  constructor(private route: ActivatedRoute, private apiService: ApiService, private apiPodcast: ApiPodcastService) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this._id = idParam !== null ? idParam : '';
    console.log(this._id)
    this.llenarData()
    this.traerPodcast()
  }

  llenarData() {
    this.apiService.getnewById(this._id).subscribe(news => {
      this.news = this.news
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
