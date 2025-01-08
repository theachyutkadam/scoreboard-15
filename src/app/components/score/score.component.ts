import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { bindCallback } from 'rxjs';
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

    let list = [10, 30, 35, 20, 30, 25, 90, 89, 35, 20];
    this.findSecondHighestNumber(list)
  }

  findSecondHighestNumber(array_list: any) {
    let max = 0
    let second_max = 0

    for(let i = 0; i < array_list.length; i++){
      if (array_list[i] > max){
        max = array_list[i]
      }
    }
    for(let i = 0; i < array_list.length; i++){
      if (array_list[i] > second_max && array_list[i] != max){
        second_max = array_list[i]
      }
    }
    console.log('Max number is-->', max);
    console.log('Second Max number is-->', second_max);


    this.findDuplicate(array_list)
    // let strings = ["a","b","c","d","d","e","a","b","c","f","g","h","h","h","e","a"]
    // this.findDuplicate(strings)
  }

  findDuplicate(array_list: any){
    let answer = array_list.reduce((key: any, value: any) => ({
      ...key,
      [value]: (key[value] || 0) +1
    }), {})

    console.log('-array list-->', array_list);
    console.log('-array answer-->', answer);
  }
}
