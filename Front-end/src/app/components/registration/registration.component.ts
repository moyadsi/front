import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientsService } from '../../services/clients.service';
import { Person } from '../../interface/Person'
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;

  Person:Person=new Person;

  constructor(private fb: FormBuilder, private clients: ClientsService, private router:Router) {
    this.form = this.fb.group({
      names: ['', Validators.required],
      lastnames: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    localStorage.setItem('token', 'abcdefghijklmnopqrstuvwxyz');
  }

  Guardar(){
    this.clients.CreatePerson(this.Person)
    .subscribe(data=>{
      console.log(data);
      
      alert("Se Agrego con Exito...!!!");
    })
  }

  onSubmit() {
    if (this.form.valid) {
      this.clients
        .postRequest(
          'http://localhost:10101/register',
          {
            name: this.form.value.names,
            lastname: this.form.value.lastnames,
            phone: this.form.value.phone,
            email: this.form.value.email,
            password: this.form.value.password,
          },
          undefined,
          { Authorization: `Bearer ${localStorage.getItem('token')}` }
        )
        .subscribe(
          (response: any) => {
            console.log(response);
          },
          (error: any) => {
            console.log('error');
          }
        );
    } else {
      console.log('Verifique sus datos');
    }
  }
}