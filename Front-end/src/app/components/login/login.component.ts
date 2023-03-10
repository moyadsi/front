import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from 'src/app/interface/Person';
import { Login } from 'src/app/interface/login';
import { ClientsService } from '../../services/clients.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  Person:Person=new Person;
  constructor(private fb: FormBuilder, private clients: ClientsService) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }


  ngOnInit(): void {
  }

  onSubmit() {

    const Login:Login={
      email: this.form.get('email')?.value,
      Password: this.form.get('Password')?.value,

    }

    this.clients.login(Login).subscribe(data=>{
      console.log(data);
      console.log("loguin");
      
    })

    console.log(Login);
  
}

}
