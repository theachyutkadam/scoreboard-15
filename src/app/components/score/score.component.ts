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
  strike_batsman: any = "Suresh Raina"
  non_strike_batsman: any = "M.S Dhoni"

  product1_quntity = 1
  product2_quntity = 1
  product3_quntity = 1

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

  swap(strike_batsman: string, non_strike_batsman: string){
    this.strike_batsman = non_strike_batsman
    this.non_strike_batsman = strike_batsman
  }

  changeQuntity(value: number, product_number: number){
    if(value == 0){
      this.toastr.info("Minimum 1 Qty required", 'Info')
      return
    }
    if(value == 11){
      this.toastr.warning("Maximum 10 Qty allowed", 'Warning')
      return
    }
    if(product_number == 1){
      this.product1_quntity = value
    } else if(product_number == 2){
      this.product2_quntity = value
    } else {
      this.product3_quntity = value
    }
  }
}
