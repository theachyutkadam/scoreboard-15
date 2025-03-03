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
    password: ['',
      [
        Validators.required,
        // Validators.minLength(6),
        // Validators.maxLength(12),
      ],
    ],
    confirm_password: ['', Validators.required],
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpService,
    private toastr: ToastrService
  ){}

  ngOnInit() {
    this.initializeForm()
    this.patchFakeUser()
  }

  patchFakeUser(){
    this.registration_form.patchValue({
      "email": "adminmailinator.com",
      "password": '11223344',
      "confirm_password": '11223344'
    })
  }

  initializeForm(){
    this.registration_form = this.fb.group(this.form_fields, {validator: this.checkPassword})
  }

  checkPassword(fg: FormGroup){
    const pass = fg.controls['password'].value
    const conf_pass = fg.controls['confirm_password'].value
    return pass === conf_pass ? null : { mismatch: true };
  }

  setPayload(form: any){
    let payload = {
      "email"    : form.email,
      "status"   : 1,
      "role_id"  : 1,
      "password" : form.password,
    }
    return payload
  }

  registration(){
    this.http.post('users', this.setPayload(this.registration_form.value)).subscribe((response: any) => {
      console.log('registration--->', response);
      response.status == 201 ? this.afterLogin(response) : this.error(response)
    }, (error: any) => {
      console.error(error.errors)
      this.toastr.error(error.errors, 'Error!');
    })
  }

  afterLogin(response: any){
    sessionStorage.setItem("authToken", response.auth_token)
    sessionStorage.setItem("user_details", response.user_details)
    this.router.navigateByUrl('/profile')
    this.toastr.success(response.email, 'Welcome!');
  }

  error(response: any){
    this.toastr.error(response.errors, 'Error!');
  }
}
