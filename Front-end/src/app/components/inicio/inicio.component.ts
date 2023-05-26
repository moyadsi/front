import { Component, ElementRef, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  constructor(public auth: AuthService, private router: Router, private elementReF: ElementRef){
  }

  isLoggedIn(): Observable<boolean>{
    return this.auth.isLoggedIn();
  }

  logout(): void {
    this.auth.logout()
    console.log('Sesion Cerrada')
    this.router.navigate(['/home']);
  }




  ngOnInit(): void {
    
  }
}
