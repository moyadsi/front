import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  campoHabilitado: boolean | undefined;
  mostrarBotonGuardar: boolean | undefined;
  campoTexto: any;
  token: string | null | undefined;
  userId: string | null | undefined;
  usuarioDetails: { Id: any; IdPerson: any; DescriptionPerson: any; Ocupation: any; telefono: any; Facebook: any; Instagram: any; Youtube: any; Likes: any; Followers: any; Followed: any; 
  PersonFullName: any; NameCities: any; ImgPerfil :any ; Email: any; Tools: any}[] | undefined;
  youtube: any;
  instagram: any;
  facebook: any;
  telefono: any;
  ocupacion: any;
  imgPerfil: any;
  email: any;
  tools: string[] = [];


  constructor(private authService: AuthService , private usuario: UsersService) { }


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
    // Obtener el token del almacenamiento local
    this.token = localStorage.getItem('token');
    // Obtener el ID del usuario del almacenamiento local
    this.userId = localStorage.getItem('userId') ?? '';
    this.obtenerDetailsPerson(this.userId);
  }
  
  sendDetailsToServer(): void {
    if (this.userId && this.token && this.city && !isNaN(parseInt(this.city))) {
      let ubicationValue: number | null = parseInt(this.city);
    
      const userDetails = {
        id: parseInt(this.userId), // Convertir a entero
        token: this.token,
        DescriptionPerson: this.description,
        Ocupation: this.ocupacion,
        telefono: this.telefono,
        Ubication: ubicationValue,
        Facebook: this.facebook,
        Instagram: this.instagram,
        Youtube: this.youtube,
        Likes: this.likes,
        Followers: this.followers,
        Followed: this.followed
      };
      console.log('Condiciones cumplidas. Enviando detalles al servidor:', userDetails);
      this.usuario.insertdetailsUsers(this.userId!, this.token, userDetails)
        .then(() => {
          // Manejar la respuesta del servidor si es necesario
          // Realizar acciones adicionales después de enviar los datos
        })
        .catch(error => {
          // Manejar el error si ocurriera
        });
    } else {
      console.log('No se cumplen las condiciones necesarias para enviar los detalles al servidor.');
      console.log('this.userId:', this.userId);
      console.log('this.city:', this.city);
    }
  }
  
  
  obtenerDetailsPerson(userId: string) {
    this.usuario.obtenerDetailsPerson(userId).subscribe(
      (response) => {
        this.usuarioDetails = response.map(({ Id, IdPerson, DescriptionPerson, Ocupation, telefono, Facebook, Instagram , Youtube ,Likes,
          Followers,Followed , PersonFullName , NameCities,ImgPerfil, Email, Tools }) => ({
          Id: Id,
          IdPerson: IdPerson,
          DescriptionPerson: DescriptionPerson,
          Ocupation: Ocupation,
          telefono: telefono,
          Facebook: Facebook,
          Instagram: Instagram,
          Youtube: Youtube,
          Likes: Likes,
          Followers:Followers,
          Followed: Followed,
          PersonFullName: PersonFullName,
          NameCities: NameCities,
          ImgPerfil : ImgPerfil,
          Email : Email,
          Tools: JSON.parse(Tools) // Convertir la cadena JSON a un arreglo
        }));
        console.log(this.usuarioDetails)
        this.description = this.usuarioDetails[0].DescriptionPerson;
        this.city = this.usuarioDetails[0].NameCities;
        this.likes = this.usuarioDetails[0].Likes;
        this.followers = this.usuarioDetails[0].Followers;
        this.followed = this.usuarioDetails[0].Followed;
        this.nameUsers = this.usuarioDetails[0].PersonFullName;
        this.ocupacion = this.usuarioDetails[0].Ocupation;
        this.telefono = this.usuarioDetails[0].telefono;
        this.facebook = this.usuarioDetails[0].Facebook;
        this.instagram = this.usuarioDetails[0].Instagram;
        this.youtube = this.usuarioDetails[0].Youtube;
        this.imgPerfil = this.usuarioDetails[0].ImgPerfil;
        this.email = this.usuarioDetails[0].Email;
        this.tools = this.usuarioDetails[0].Tools;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
}
