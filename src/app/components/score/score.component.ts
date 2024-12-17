import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/connections/http.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent {
  metch_id: any;
  score_form!: FormGroup

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) {
    this.metch_id = this.route.snapshot.params['id']
  }

  form_fields = {
    ball_status: ['', Validators.required],
    bowled_in_over: ['', Validators.required],
    over_number: ['', Validators.required],
    real_ball_number: ['', Validators.required],
    run_type: ['', Validators.required],
    total_runs: ['', Validators.required],
    wicket_type: ['', Validators.required],
    bowler_id: ['', Validators.required],
    inning_id: ['', Validators.required],
    non_strick_batsman_id: ['', Validators.required],
    strick_batsman_id: ['', Validators.required],
  }

  resert(){ this.initializeForm() }
  ngOnInit() { this.initializeForm() }
  initializeForm(){ this.score_form = this.fb.group(this.form_fields) }
}
