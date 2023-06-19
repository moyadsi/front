import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  showPassword: boolean = false;
  password: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required],
    });    
  }

  ngOnInit(): void {}
  onSubmit() {
    if (this.form.valid) {
      const credentials = {
        email: this.form.get('Email')?.value as string,
        Password: this.form.get('Password')?.value as string,
      };
  
      this.authService.login(credentials)
        .then(response => {
          const token = response.token;
          const id = response.id.toString(); // Convierte el ID a string
          localStorage.setItem('token', token);
          localStorage.setItem('userId', id); // Almacena el ID del usuario en el almacenamiento local como string          
          console.log('Inicio de sesión exitoso', response);
          this.router.navigate(['dashboard']).then(() => {
            location.reload();
          });
        })
        .catch(error => {
          console.error('Error al iniciar sesión:', error);
        });
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
