import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Route, Router } from '@angular/router';
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
    private http: HttpService
  ){}

  ngOnInit() { this.initializeForm() }
  initializeForm(){ this.login_form = this.fb.group(this.form_fields) }

  setPayload(form: any){
    let payload = { "email" : form.email, "password" : form.password}
    return payload
  }

  login(){
    this.http.post('users/login', this.setPayload(this.login_form.value)).subscribe((response: any) => {
      console.log('login--->', response);
      if(response.status == 200){
        sessionStorage.setItem("authToken", "6s54d6f54s6d5f6s5d4f65s4df")
        this.router.navigateByUrl('/')
      }
    })
  }
}
