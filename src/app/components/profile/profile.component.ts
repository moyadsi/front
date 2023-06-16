import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  campoHabilitado: boolean | undefined;
  mostrarBotonGuardar: boolean | undefined;
campoTexto: any;
  userId: string | undefined;

  constructor(private authService: AuthService) { }

  /*variables*/
  cantProjects: number = 0 
  likes:number = 0
  followers:number = 0 // Seguidores
  followed: number = 0 // seguidos
  nameUsers:string= 'Antonio J prueba'
  description:string = ''
  city:string=''

    /*MANEJO BOTON FAVORITOS*/
    counters= [0,0,0,0,0,0,0,0,0,0,0,0];
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
  mostrarComponente = [false, false, false];

  toggleComponent(index: number): void {
    this.mostrarComponente[index] = !this.mostrarComponente[index];
  }
  
  habilitarEdicion() {
    this.campoHabilitado = true;
    this.mostrarBotonGuardar = true;
  }

  guardarCambios() {
    // Lógica para guardar los cambios
    this.campoHabilitado = false;
    this.mostrarBotonGuardar = false;
  }
  
  ngOnInit() {
    this.authService.getUserId().subscribe(
      (userId) => {
        if (userId) {
          this.userId = userId;
          console.log('ID del usuario logueado:', userId);
        } else {
          console.log('No se pudo obtener el ID del usuario logueado.');
        }
        
      },
      (error) => {
        console.error('Error al obtener el ID del usuario:', error);
      }
    );
  }

}
