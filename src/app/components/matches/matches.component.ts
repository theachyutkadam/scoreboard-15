import { Component, ElementRef, ViewChild } from '@angular/core';
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
  @ViewChild('filter') filter!: ElementRef;

  form_title = "Match"
  action_url = "matches"
  edit_match: any

  match_form_tags: any
  match_form!: FormGroup

  //table head asc and desc variables
  order: boolean = false
  order_by: string = 'id'

  //table data variables
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

  headers = [
    {name: "ID", order: 'id'},
    {name: "Match", order: 'team1_id'},
    {name: "No.Of.Overs", order: 'number_of_overs'},
    {name: "Start At", order: 'start_at'},
    {name: "End At", order: 'end_at'},
    {name: "Status", order: 'status'},
  ]

  ngOnInit() {
    this.getTeams()
    this.getMatches()
  }

  getMatchesByOrder(order_by: string = "name") {
    this.order = !this.order
    this.order_by = order_by
    this.getMatches(this.filter.nativeElement.value)
  }

  getMatches(event: any= "upcomming"){
    let status= event.target ? event.target.value : event
    let params = [
      {key: "status", value: status},
      {key: "order_by", value: this.order_by},
      {key: "order", value: this.order ? 'asc' : 'desc'}
    ]

    this.http.get('matches', params).subscribe((response: any) => {
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
      { type: 'datetime-local', is_required: true, label: 'Start At' , form_control_name: 'start_at', value: this.edit_match == null ? new Date() : this.edit_match.start_at},
      { type: 'datetime-local', is_required: true, label: 'End At' , form_control_name: 'end_at', value: this.edit_match == null ? '' : this.edit_match.end_at},
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
      response.match.start_at = new Date(response.match.start_at).toISOString().slice(0, 16);
      if(response.match.end_at){
        response.match.end_at = new Date(response.match.end_at).toISOString().slice(0, 16);
      }
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
