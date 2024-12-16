import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { HttpService } from 'src/app/connections/http.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  form_title = "Users"
  form_type = "New"
  action_url = "users"
  players: any
  users: any

  constructor( private http: HttpService ){}
  ngOnInit(){ this.getPlayers() }

  getPlayers(){ // TODO: Call players API bcz User Details are save in players table
    this.http.get('players', '').subscribe((response: any) => {
      this.users = response.players
    })
  }

  form_fields = {
    email: ['', Validators.required],
    // password: ['', Validators.required],

    first_name: ['', Validators.required],
    middle_name: [''],
    last_name: ['', Validators.required],
    contact: ['', Validators.required],
    gender: ['', Validators.required],
    birth_date: ['', Validators.required],
    speciality: ['', Validators.required],
  }

  user_form_tags = [
    { type: 'text', is_required: true, label: 'First Name' , form_control_name: 'first_name' },
    { type: 'text', is_required: false, label: 'Middle Name' , form_control_name: 'middle_name' },
    { type: 'text', is_required: true, label: 'Last Name' , form_control_name: 'last_name' },
    { type: 'email', is_required: true, label: 'Email' , form_control_name: 'email' },
    // { type: 'password', is_required: true, label: 'Password' , form_control_name: 'password' },

    { type: 'text', is_required: true, label: 'Contact' , form_control_name: 'contact' },
    { type: 'text', is_required: true, label: 'Gender' , form_control_name: 'gender' },
    { type: 'date', is_required: true, label: 'Birth Date' , form_control_name: 'birth_date' },
    { type: 'text', is_required: true, label: 'Speciality' , form_control_name: 'speciality' },
  ]

  edit_user = {}
}
