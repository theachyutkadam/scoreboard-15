import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/connections/http.service';

@Component({
  selector: 'app-center-form',
  templateUrl: './center-form.component.html',
  styleUrls: ['./center-form.component.css']
})
export class CenterFormComponent {
  center_form: FormGroup | any
  input_error_message = "Invalid filed"
  action = "New"

  @Input() form_fields_validation: any
  @Input() center_form_tags: any
  @Input() form_title: any
  @Input() action_url: any
  @Input() edit: any

  input_options = ['text', 'date', 'datetime-local', 'password', 'email', 'number']
  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private router: Router,
  ) { }

  ngOnChanges() {
    // this.editForm(this.edit)
    this.ngOnInit()
  }

  ngOnInit() {
    this.initializeForm()
    if(this.edit){
      this.editForm(this.edit)
      this.action = "Edit"
    }
  }

  reset(){
    this.initializeForm()
    this.action = "New"
  }

  initializeForm() {this.center_form = this.fb.group(this.form_fields_validation)}
  editForm(object: any){ this.center_form.patchValue(object) }

  saveForm(){
    console.log('Log--->', this.center_form.value)
    this.reset()
    // this.http.post('matches', this.setPayload(this.match_form.value)).subscribe((response: any) => {
    //   console.log('Log--->', response);
    //   // this.getMatches()
    // })
  }
}
