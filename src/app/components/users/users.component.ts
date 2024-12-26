import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/connections/http.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  form_title = "Users"
  action_url = "users"
  edit_user: any

  user_id: any
  players: any
  users: any

  // dropdowns
  genders = [
    {"id": 'male', "name": 'Male'},
    {"id": 'female', "name": 'female'},
    {"id": 'other', "name": 'Other'},
  ]

  specialities = [
    {"id": 'bowler', "name": 'Bowler'},
    {"id": 'batsman', "name": 'Batsman'},
    {"id": 'filder', "name": 'Filder'},
  ]

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ){}

  ngOnInit(){ this.getPlayers() }

  getPlayers(){ // TODO: Call players API bcz User Details are save in players table
    this.http.get('players', '').subscribe((response: any) => {
      this.users = response.players
    })
  }

  form_fields = {
    // email: ['', Validators.required],
    first_name: ['', Validators.required],
    middle_name: [''],
    last_name: ['', Validators.required],
    contact: ['', Validators.required],
    gender: ['', Validators.required],
    birth_date: ['', Validators.required],
    speciality: ['', Validators.required],
  }

  user_form_tags = [
    // { type: 'email', is_required: true, label: 'Email' , form_control_name: 'email' },
    { type: 'text', is_required: true, label: 'First Name' , form_control_name: 'first_name' },
    { type: 'text', is_required: false, label: 'Middle Name' , form_control_name: 'middle_name' },
    { type: 'text', is_required: true, label: 'Last Name' , form_control_name: 'last_name' },
    { type: 'text', is_required: true, label: 'Contact' , form_control_name: 'contact' },
    { type: 'date', is_required: true, label: 'Birth Date' , form_control_name: 'birth_date' },
    { type: 'select', is_required: true, label: 'Gender' , form_control_name: 'gender', dropdown: this.genders },
    { type: 'select', is_required: true, label: 'Speciality' , form_control_name: 'speciality', dropdown: this.specialities},
  ]

  setPayload(event: any){
    let payload = {
      // "email"      : event.form.email,
      "first_name" : event.form.first_name,
      "middle_name": event.form.middle_name,
      "last_name"  : event.form.last_name,
      "contact"    : event.form.contact,
      "birth_date" : event.form.birth_date,
      "gender"     : event.form.gender,
      "speciality" : event.form.speciality,
      "user_id"    : this.user_id,
    }
    event.action == 'New' ? this.create(payload) : this.update(payload)
  }

  create(payload: any){
    this.http.post('players', payload).subscribe((response: any) => {
      this.afterSave("User Create!")
    }, (err: any) => {this.apiError(err)})
  }

  update(payload: any){
    this.http.patch('players/'+this.edit_user.id, payload).subscribe((response: any) => {
      this.afterSave("User Update!")
    }, (err: any) => {this.apiError(err)})
  }

  afterSave(msg: string){
    this.getPlayers()
    this.edit_user = null
    this.toastr.success(msg, 'Success!');
  }

  editUser(user_id: any){
    this.http.get('players/'+user_id, '').subscribe((response: any) => {
      this.edit_user = response.player
      this.user_id = response.player.user_id
    }, (err: any) => {this.apiError(err)})
  }

  deleteUser(user_id: any){
    this.http.delete('players/'+user_id).subscribe((response: any) => {
      this.getPlayers()
      this.edit_user = null
      this.toastr.error("User Deleted", 'Destroy!');
    }, (err: any) => {this.apiError(err)})
  }

  apiError(err: any){
    console.error(err)
    this.toastr.error(err.message, 'Error!');
  }
}
