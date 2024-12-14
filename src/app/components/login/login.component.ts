import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login_form!: FormGroup

  form_fields = {
    username: ['', Validators.required],
    password: ['', Validators.required]
  }

  constructor(
    private fb: FormBuilder,
    private router: Router
  ){}

  ngOnInit() { this.initializeForm() }
  initializeForm(){ this.login_form = this.fb.group(this.form_fields) }

  setPayload(form: any){
    let payload = { "username" : form.username, "password" : form.password}
    return payload
  }

  login(){
    // this.setPayload(this.login_form.controls)
    console.log('Log--->', this.setPayload(this.login_form.value));
    sessionStorage.setItem("authToken", "6s54d6f54s6d5f6s5d4f65s4df")
    this.router.navigateByUrl('/')
    // this.authService.login(this.setPayload(this.login_form.value))
  }
}
