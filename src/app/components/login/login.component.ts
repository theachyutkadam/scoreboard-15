import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/connections/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login_form!: FormGroup

  form_fields = {
    email: ['', Validators.required],
    password: ['', Validators.required]
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpService,
    private toastr: ToastrService
  ){}

  ngOnInit() {
    this.patchFakeUser()
    this.initializeForm()
  }

  patchFakeUser(){
    this.http.get('', '').subscribe((response: any) => {
      this.login_form.patchValue(
        {"email": response.active_users[0], "password": '11223344'}
      )
    })
  }
  initializeForm(){ this.login_form = this.fb.group(this.form_fields) }

  setPayload(form: any){
    let payload = { "email" : form.email, "password" : form.password}
    return payload
  }

  login(){
    this.http.post('users/login', this.setPayload(this.login_form.value)).subscribe((response: any) => {
      console.log('login--->', response);
      // response.status == 200 ? this.afterLogin(response) : this.error(response)
      this.afterLogin(response)
    }, (err: any) => {
      console.error(err)
      this.toastr.error(err.message, 'Error!');
    })
  }

  afterLogin(response: any){
    sessionStorage.setItem("authToken", response.auth_token)
    sessionStorage.setItem("user_details", response.user_details)
    this.router.navigateByUrl('/')
    this.toastr.success(response.user_details.email, 'Welcome!');
  }

  error(response: any){
    this.toastr.error(response.errors, 'Error!');
  }
}
