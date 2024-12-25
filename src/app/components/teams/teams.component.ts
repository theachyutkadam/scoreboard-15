import { Component } from '@angular/core';
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

  getTeams(){
    this.http.get('teams', '').subscribe((response: any) => {
      this.teams = response.teams
    }, (err: any) => {this.apiError(err)})
  }

  setupPageTags(){
    this.team_form_tags = [
      { type: 'text', is_required: true, label: 'Name' , form_control_name: 'name' },
      // { type: 'text', is_required: false, label: 'Name' , form_control_name: 'status' },
      { type: 'text', is_required: false, label: 'State' , form_control_name: 'state' },
      { type: 'text', is_required: true, label: 'City' , form_control_name: 'city' },
      { type: 'text', is_required: false, label: 'Location' , form_control_name: 'location' },
      { type: 'text', is_required: true, label: 'Contact' , form_control_name: 'contact' },
      { type: 'select', is_required: true, label: 'Captain' , form_control_name: 'captain_id', dropdown: this.players },
      { type: 'select', is_required: false, label: 'Vice Captain' , form_control_name: 'vice_captain_id', dropdown: this.players },
    ]
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
