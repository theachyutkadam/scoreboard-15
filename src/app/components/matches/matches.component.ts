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
  // form_type = "New"
  action_url = "matches"
  edit_match: any
  teams: any
  matches: any
  match_form_tags: any
  match_form!: FormGroup

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private route: ActivatedRoute,
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
    this.initializeForm()
    this.getTeams()
    this.getMatches()
  }

  resert(){ this.initializeForm() }
  initializeForm(){ this.match_form = this.fb.group(this.form_fields) }

  getMatches(){
    this.http.get('matches', '').subscribe((response: any) => {
      this.matches = response.matches
    }, (err: any) => {this.apiError(err)})
  }

  getTeams(){
    this.http.get('teams', '').subscribe((response: any) => {
      this.teams = response.teams
      this.setupPageTags()
    }, (err: any) => {this.apiError(err)})  }

  setupPageTags(){
    this.match_form_tags = [
      { type: 'select', is_required: true, label: 'Team1' , form_control_name: 'team1_id', dropdown: this!.teams},
      { type: 'select', is_required: true, label: 'Team2' , form_control_name: 'team2_id', dropdown: this!.teams},
      { type: 'datetime-local', is_required: true, label: 'Start At' , form_control_name: 'start_at' },
      { type: 'datetime-local', is_required: true, label: 'End At' , form_control_name: 'end_at' },
      { type: 'select', is_required: true, label: 'Toss Winer Team' , form_control_name: 'toss_winer_team_id', dropdown: this!.teams},
      { type: 'text', is_required: true, label: 'Toss Dicision' , form_control_name: 'toss_dicision' },
      { type: 'text', is_required: true, label: 'Number Of Overs' , form_control_name: 'number_of_overs' },
      { type: 'checkbox', is_required: false, label: 'Is Draw' , form_control_name: 'is_draw' },
    ]
  }

  setPayload(form: any){
    let payload = {
      "team1_id":           parseInt(form.team1_id),
      "team2_id":           parseInt(form.team2_id),
      "toss_winer_team_id": parseInt(form.toss_winer_team_id),
      "toss_dicision":   form.toss_dicision,
      "start_at":        form.start_at,
      "end_at":          form.end_at,
      "number_of_overs": parseInt(form.number_of_overs),
      "is_draw":         form.is_draw,
    }
    return payload
  }

  saveMatches() {
    console.warn('Wrn--->', this.setPayload(this.match_form.value));
    this.http.post('matches', this.setPayload(this.match_form.value)).subscribe((response: any) => {
      console.log('Log--->', response);
      this.getMatches()
    })
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
