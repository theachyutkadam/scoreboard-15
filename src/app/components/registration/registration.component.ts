import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/connections/http.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registration_form!: FormGroup

  form_fields = {
    email: ['', Validators.required],
    password: ['', Validators.required],
    confirm_password: ['', Validators.required]
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpService,
    private toastr: ToastrService
  ){}

  ngOnInit() {
    // this.patchFakeUser()
    this.initializeForm()
  }

  patchFakeUser(){
    this.registration_form.patchValue(
      {"email": "admin@mailinator.com", "password": '11223344'}
    )
  }
  initializeForm(){ this.registration_form = this.fb.group(this.form_fields) }

  setPayload(form: any){
    let payload = { "email" : form.email, "password" : form.password}
    return payload
  }

  registration(){
    this.http.post('users/registration', this.setPayload(this.registration_form.value)).subscribe((response: any) => {
      console.log('registration--->', response);
      response.status == 200 ? this.afterLogin(response) : this.error(response)
    }, (err: any) => {
      console.error(err)
      this.toastr.error(err.message, 'Error!');
    })
  }

  afterLogin(response: any){
    sessionStorage.setItem("authToken", response.auth_token)
    sessionStorage.setItem("user_details", response.user_details)
    this.router.navigateByUrl('/')
    this.toastr.success(response.user_details.full_name, 'Welcome!');
  }

  error(response: any){
    this.toastr.error(response.errors, 'Error!');
  }
}
