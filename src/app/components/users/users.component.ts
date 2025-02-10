import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/connections/http.service';
import { CommonTaskService } from 'src/app/services/common/common-task.service';

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

  //table head asc and desc variables
  order: boolean = false
  order_by: string = 'id'

  //table data variables
  users: any

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
    { type: 'select', is_required: true, label: 'Gender' , form_control_name: 'gender', dropdown: this.common.genders },
    { type: 'select', is_required: true, label: 'Speciality' , form_control_name: 'speciality', dropdown: this.common.specialities},
  ]

  headers = [
    {name: "ID", field: 'id', type: 'number'},
    {name: "Name", field: 'name', type: 'string'},
    {name: "Email", field: 'email', type: 'object'},
    {name: "Contact", field: 'contact', type: 'string'},
    {name: "Speciality", field: 'speciality', type: 'string'},
    {name: "Gender", field: 'gender', type: 'string'},
    // {name: "Status", field: 'user.status', type: 'object'},
  ]

  filter_options = [
    {name: "Batsman", value: "batsman"},
    {name: "Bowler", value: "bowler"},
    {name: "Filder", value: "filder"},
    {name: "All", value: ""},
  ]

  constructor(
    private http: HttpService,
    private toastr: ToastrService,
    private common: CommonTaskService
  ){}

  ngOnInit(){ this.getPlayers() }

  getPlayersByOrder(event: any = "first_name") {
    console.log('-CT sort-->', event);
    this.order = !this.order
    this.order_by = event.sort_by == "name" ? 'first_name' : event.sort_by
    this.getPlayers(event.filter)
  }

  getPlayers(event: any= "batsman"){ // TODO: Call players API bcz User Details are save in players table
    let params = [
      {key: "speciality", value: event},
      {key: "order_by", value: this.order_by},
      {key: "order", value: this.order ? 'asc' : 'desc'}
    ]
    this.http.get('players', params).subscribe((response: any) => {
      this.users = response.players
    })
  }

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

  tableAction(event: any){
    event.action == 'Edit' ? this.editUser(event.record_id) : this.deleteUser(event.record_id)
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
