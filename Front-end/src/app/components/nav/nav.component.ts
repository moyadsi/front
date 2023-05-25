import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',

  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isLogin = new BehaviorSubject<boolean>(this.checkToken());
  private checkToken() : boolean {
    return !!localStorage.getItem('token');
  }

  login(token:string) : void {
    localStorage.setItem('token', token);
    this.isLogin.next(true);

  }

  constructor(public auth: AuthService, private elementReF: ElementRef){}
  isActive : boolean = false;
  rutas(ruta: string) {
    const elementNews = this.elementReF.nativeElement.ownerDocument.querySelector(ruta);
    console.log(elementNews);
    elementNews.scrollIntoView({ behavior: 'smooth' });
  }

  ngOnInit(): void {
    
  }
}
