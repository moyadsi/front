import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-best-meta',
  templateUrl: './best-meta.component.html',
  styleUrls: ['./best-meta.component.css']
})
export class BestMetaComponent implements OnInit {
selectedValue: any;

  constructor() { }
  nameUser: string ='Vayana Silva'
  /*MANEJO BOTON FAVORITOS*/
  counters= [0,0,0,0,0,0];
  favoriteCount = 0;

  toggleFavorite(index: number) {
    if (this.counters[index] === 0) {
      this.counters[index]++;
      this.favoriteCount++;
    } else {
      this.counters[index]--;
      this.favoriteCount--;
    }
  
}

/* MANEJO BOTON DE SEGUIR*/
isActive = [false, false, false,false,false,false];
buttonLabel = 'Seguir';

toggleButton(index: number) {
  if (this.counters[index] === 0){
    this.isActive[index] = !this.isActive[index];
  } 
}

  ngOnInit(): void {
  }

}
