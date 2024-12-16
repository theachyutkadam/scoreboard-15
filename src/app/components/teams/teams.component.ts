import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/connections/http.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent {
  form_title = "Teams"
  form_type = "New"
  action_url = "teams"
  players: any
  teams: any

  constructor( private http: HttpService ){}
  ngOnInit(){
    this.getPlayers()
    this.getTeams()
  }

  getPlayers(){
    this.http.get('players', '').subscribe((response: any) => {
      this.players = response.players
    })
  }

  getTeams(){
    this.http.get('teams', '').subscribe((response: any) => {
      this.teams = response.teams
    })
  }

  form_fields = {
    name: ['', Validators.required],
    // status: [''],
    state: [''],
    city: ['', Validators.required],
    location: [''],
    contact: ['', Validators.required],
    captain_id: ['', Validators.required],
    vice_captain_id: [''],
  }

  team_form_tags = [
    { type: 'text', is_required: true, label: 'Name' , form_control_name: 'name' },
    // { type: 'text', is_required: false, label: 'Name' , form_control_name: 'status' },
    { type: 'text', is_required: false, label: 'State' , form_control_name: 'state' },
    { type: 'text', is_required: true, label: 'City' , form_control_name: 'city' },
    { type: 'text', is_required: false, label: 'Location' , form_control_name: 'location' },
    { type: 'text', is_required: true, label: 'Contact' , form_control_name: 'contact' },
    { type: 'select', is_required: true, label: 'Captain' , form_control_name: 'captain_id' },
    { type: 'select', is_required: false, label: 'Vice Captain' , form_control_name: 'vice_captain_id' },
  ]

  edit_team = {
    // "company_name": "KTM",
    // "name": "390 adventure R",
    // "color": "Orange",
    // "number": "MH14 RA 4907",
    // "engine_in_cc": "399",
    // "top_speed": "205",
    // "type": "2w",
    // "purchase_date": "2024-11-19",
  }
}
