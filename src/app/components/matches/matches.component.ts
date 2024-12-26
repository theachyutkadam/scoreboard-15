import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/connections/http.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent {
  form_title = "Match"
  action_url = "matches"
  edit_match: any
  match_form_tags: any
  match_form!: FormGroup

  teams: any
  matches: any
  toss_dicission = [
    {"id": 'bating', "name": 'Bating'},
    {"id": 'filding', "name": 'Filding'},
  ]

  constructor(
    private http: HttpService,
    private toastr: ToastrService,
  ) {}

  form_fields = {
    team1_id: ['', Validators.required],
    team2_id: ['', Validators.required],
    start_at: ['', Validators.required],
    end_at: [''],
    toss_winer_team_id: ['', Validators.required],
    toss_dicision: ['', Validators.required],
    number_of_overs: ['', Validators.required],
    is_draw: [''],
  }

  ngOnInit() {
    this.getTeams()
    this.getMatches()
  }

  getMatches(){
    this.http.get('matches', '').subscribe((response: any) => {
      this.matches = response.matches
    }, (err: any) => {this.apiError(err)})
  }

  getTeams(){
    this.http.get('teams', '').subscribe((response: any) => {
      this.teams = response.teams
      this.setupPageTags()
    }, (err: any) => {this.apiError(err)})
  }

  setupPageTags(){
    this.match_form_tags = [
      { type: 'select', is_required: true, label: 'Team1' , form_control_name: 'team1_id', dropdown: this!.teams},
      { type: 'select', is_required: true, label: 'Team2' , form_control_name: 'team2_id', dropdown: this!.teams},
      { type: 'datetime-local', is_required: true, label: 'Start At' , form_control_name: 'start_at' },
      { type: 'datetime-local', is_required: true, label: 'End At' , form_control_name: 'end_at' },
      { type: 'select', is_required: true, label: 'Toss Winer Team' , form_control_name: 'toss_winer_team_id', dropdown: this!.teams},
      { type: 'select', is_required: true, label: 'Toss Dicision' , form_control_name: 'toss_dicision', dropdown: this.toss_dicission },
      { type: 'text', is_required: true, label: 'Number Of Overs' , form_control_name: 'number_of_overs' },
      { type: 'checkbox', is_required: false, label: 'Is Draw' , form_control_name: 'is_draw' },
    ]
  }

  setPayload(event: any){
    let payload = {
      "team1_id":           event.form.team1_id,
      "team2_id":           event.form.team2_id,
      "toss_winer_team_id": event.form.toss_winer_team_id,
      "toss_dicision":      event.form.toss_dicision,
      "start_at":           event.form.start_at,
      "end_at":             event.form.end_at,
      "number_of_overs":    event.form.number_of_overs,
      "is_draw":            event.form.is_draw,
    }
    event.action == 'New' ? this.create(payload) : this.update(payload)
  }

  create(payload: any){
    this.http.post('matches', payload).subscribe((response: any) => {
      this.afterSave("Match Create!")
    }, (err: any) => {this.apiError(err)})
  }

  update(payload: any){
    this.http.patch('matches/'+this.edit_match.id, payload).subscribe((response: any) => {
      this.afterSave("Match Update!")
    }, (err: any) => {this.apiError(err)})
  }

  afterSave(msg: string){
    this.getMatches()
    this.edit_match = null
    this.toastr.success(msg, 'Success!');
  }

  editMatch(match_id: any){
    this.http.get('matches/'+match_id, '').subscribe((response: any) => {
      this.edit_match = response.match
    }, (err: any) => {this.apiError(err)})
  }

  deleteMatch(match_id: any){
    this.http.delete('matches/'+match_id).subscribe((response: any) => {
      this.getMatches()
      this.edit_match = null
      this.toastr.error("Match Deleted", 'Destroy!');
    }, (err: any) => {this.apiError(err)})
  }

  apiError(err: any){
    console.error(err)
    this.toastr.error(err.message, 'Error!');
  }
}
