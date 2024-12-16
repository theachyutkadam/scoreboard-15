import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/connections/http.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent {
  form_type = "New"
  teams: any
  matches: any
  // match_filter: string = 'upcomming'
  match_form!: FormGroup

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private route: ActivatedRoute,
  ) {}

  form_fields = {
    team1: ['', Validators.required],
    team2: ['', Validators.required],
    start_at: ['', Validators.required],
    end_at: [''],
    toss_winer_team: ['', Validators.required],
    toss_dicision: ['', Validators.required],
    number_of_overs: ['', Validators.required],
    is_draw: [''],
  }

  ngOnInit() {
    this.getMatches()
    this.initializeForm()
    this.getTeams()
  }

  resert(){ this.initializeForm() }
  initializeForm(){ this.match_form = this.fb.group(this.form_fields) }

  getMatches(){
    this.http.get('matches', '').subscribe((response: any) => {
      this.matches = response.matches
    })
  }

  getTeams(){
    this.http.get('teams', '').subscribe((response: any) => {
      this.teams = response.teams
    })
  }

  setPayload(form: any){
    let payload = {
      "team1_id":           parseInt(form.team1),
      "team2_id":           parseInt(form.team2),
      "toss_winer_team_id": parseInt(form.toss_winer_team),
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

}
