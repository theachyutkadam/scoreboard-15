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

  @Input() center_form_fields: any
  @Input() form_fields_validation: any
  @Input() form_title: any
  @Input() dropdown: any
  @Input() edit: any

  input_options = ['text', 'date', 'datetime-local', 'password', 'email', 'number']
  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.initializeForm()
    if(this.edit){
      this.editForm(this.edit)
    }
  }

  reset(){ this.initializeForm() }
  initializeForm() {this.center_form = this.fb.group(this.form_fields_validation)}

  saveForm(){
    console.log('Log--->', this.center_form.value);
    console.log('Log-is_draw-->', this.center_form.value.is_draw);
  }

  editForm(object: any){
    console.log('Log--->', object);
    this.center_form.patchValue(object)
  }
}
