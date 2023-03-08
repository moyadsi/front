import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientsService } from '../../services/clients.service';
import { Person } from '../../interface/Person'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;

  Person:Person=new Person;

  constructor(private fb: FormBuilder, private clients: ClientsService) {
    this.form = this.fb.group({
      Name: ['', Validators.required],
      lastname: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {

      const PersonSave:Person={
        Name: this.form.get('Name')?.value,
        lastname: this.form.get('lastname')?.value,
        phone: this.form.get('phone')?.value,
        email: this.form.get('email')?.value,
        Password: this.form.get('Password')?.value
      }

      this.clients.CreatePerson(PersonSave).subscribe(data=>{
        console.log(data);
        console.log("User created");
        
      })

      console.log(PersonSave);
    
  }
}
