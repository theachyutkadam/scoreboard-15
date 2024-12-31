import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/connections/http.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent {
  form_title = "Teams"
  action_url = "teams"
  edit_team: any
  team_form_tags: any

  //table head asc and desc variables
  order: boolean = false
  order_by: string = 'id'

  //table data variables
  players: any
  teams: any

  form_fields = {
    name: ['', Validators.required],
    state: [''],
    city: ['', Validators.required],
    location: [''],
    contact: ['', Validators.required],
    captain_id: ['', Validators.required],
    vice_captain_id: [''],
  }

  headers = [
    {name: "ID", order: 'id'},
    {name: "Name", order: 'name'},
    {name: "City", order: 'city'},
    {name: "Contact", order: 'contact'},
    {name: "Captain", order: 'captain_id'},
    {name: "Status", order: 'status'},
  ]

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ){}

  ngOnInit(){
    this.getPlayers()
    this.getTeams()
  }

  getPlayers(){
    this.http.get('players', '').subscribe((response: any) => {
      this.players = response.players
      this.setupPageTags()
    }, (err: any) => {this.apiError(err)})
  }

  getTeamsByOrder(order_by: string = "name", order: string = 'asc') {
    if(this.order_by == order_by){
      this.order = !this.order
    } else{
      this.order_by = order_by
    }

    this.getTeams(this.filter.nativeElement.value)
  }

  @ViewChild('filter') filter!: ElementRef;

  getTeams(event: any= "active"){
    let status= event.target ? event.target.value : event
    let params = [
      {key: "status", value: status},
      {key: "order_by", value: this.order_by},
      {key: "order", value: this.order ? 'asc' : 'desc'}
    ]

    this.http.get('teams', params).subscribe((response: any) => {
      this.teams = response.teams
    }, (err: any) => {this.apiError(err)})
  }

  setupPageTags(){
    this.team_form_tags = [
      // { type: 'text', is_required: false, label: 'Status' , form_control_name: 'status' },
      { type: 'text', is_required: true, label: 'Name' , form_control_name: 'name' },
      { type: 'text', is_required: false, label: 'State' , form_control_name: 'state' },
      { type: 'text', is_required: true, label: 'City' , form_control_name: 'city' },
      { type: 'text', is_required: false, label: 'Location' , form_control_name: 'location' },
      { type: 'text', is_required: true, label: 'Contact' , form_control_name: 'contact' },
      { type: 'select', is_required: true, label: 'Captain' , form_control_name: 'captain_id', dropdown: this.players },
      { type: 'select', is_required: false, label: 'Vice Captain' , form_control_name: 'vice_captain_id', dropdown: this.players },
    ]
  }

  setPayload(event: any){
    let payload = {
      "name"           : event.form.name,
      "state"          : event.form.state,
      "city"           : event.form.city,
      "location"       : event.form.location,
      "contact"        : event.form.contact,
      "captain_id"     : event.form.captain_id,
      "vice_captain_id": event.form.vice_captain_id,
    }
    event.action == 'New' ? this.create(payload) : this.update(payload)
  }

  create(payload: any){
    this.http.post('teams', payload).subscribe((response: any) => {
      this.afterSave("Team Create!")
    }, (err: any) => {this.apiError(err)})
  }

  update(payload: any){
    this.http.patch('teams/'+this.edit_team.id, payload).subscribe((response: any) => {
      this.afterSave("Team Update!")
    }, (err: any) => {this.apiError(err)})
  }

  afterSave(msg: string){
    this.getTeams()
    this.edit_team = null
    this.toastr.success(msg, 'Success!');
  }

  editTeam(team_id: any){
    this.http.get('teams/'+team_id, '').subscribe((response: any) => {
      this.edit_team = response.team
    }, (err: any) => {this.apiError(err)})
  }

  deleteTeam(team_id: any){
    this.http.delete('teams/'+team_id).subscribe((response: any) => {
      this.getTeams()
      this.edit_team = null
      this.toastr.error("Team Deleted", 'Destroy!');
    }, (err: any) => {this.apiError(err)})
  }

  apiError(err: any){
    console.error(err)
    this.toastr.error(err.message, 'Error!');
  }
}
