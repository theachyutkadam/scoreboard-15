import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { HttpService } from 'src/app/connections/http.service';
import { CommonTaskService } from 'src/app/services/common/common-task.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  form_title = "User Profile"
  form_type = "New"
  action_url = "users"
  edit_user: any

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
    { type: 'email', is_required: true, label: 'Email' , form_control_name: 'email' },
    // { type: 'password', is_required: true, label: 'Password' , form_control_name: 'password' },

    { type: 'text', is_required: true, label: 'First Name' , form_control_name: 'first_name' },
    { type: 'text', is_required: false, label: 'Middle Name' , form_control_name: 'middle_name' },
    { type: 'text', is_required: true, label: 'Last Name' , form_control_name: 'last_name' },
    { type: 'text', is_required: true, label: 'Contact' , form_control_name: 'contact' },
    { type: 'date', is_required: true, label: 'Birth Date' , form_control_name: 'birth_date' },
    { type: 'select', is_required: true, label: 'Gender' , form_control_name: 'gender', dropdown: this.common.genders},
    { type: 'select', is_required: true, label: 'Speciality' , form_control_name: 'speciality', dropdown: this.common.specialities}
  ]

  constructor(
    private http: HttpService,
    private common: CommonTaskService
  ){}
  ngOnInit(){ this.getUserProfile() }

  getUserProfile(){
    this.http.get('players/3', '').subscribe((response: any) => {
      this.editUser(response.player)
    })
  }

  editUser(response: any) {
    this.edit_user = {
      "email": response.user.email,
      "first_name": response.first_name,
      "middle_name": response.middle_name,
      "last_name": response.last_name,
      "contact": response.contact,
      "gender": response.gender,
      "birth_date": response.birth_date,
      "speciality": response.speciality,
    }
  }
}
