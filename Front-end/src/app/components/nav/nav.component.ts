import { Component, OnInit, ElementRef} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public auth: AuthService, private elementReF: ElementRef){}

  
  isLoggedIn(): Observable<boolean>{
    return this.auth.isLoggedIn();
  }

  rutas(ruta: string){
    const elementNews = this.elementReF.nativeElement.ownerDocument.querySelector(ruta);
    console.log(elementNews);
    elementNews.scrollIntoView({behavior: 'smooth'});
  }

  ngOnInit(): void {
    
  }
}
