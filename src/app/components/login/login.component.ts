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
    this.learnPromise()
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
    sessionStorage.setItem("user_details", JSON.stringify(response.user_details))
    this.router.navigateByUrl('/')
    this.toastr.success(response.user_details.email, 'Welcome!');
  }

  error(response: any){
    this.toastr.error(response.errors, 'Error!');
  }

  dell = {
    brand: "Dell",
    hardisk: "2TB",
    color: "silver",
  }
  hp = {
    brand: "HP",
    hardisk: "1TB",
    color: "white",
  }
  not_available = {
    status: "Stock not available"
  }
  dellLaptop(){ return false }

  hpLaptop(){ return false }

  laptop: any
  learnPromise(){
    let byLaptop = new Promise((resolve: any, reject: any) => {
      // resolve("promise worked!")
      if(this.dellLaptop()){
        setTimeout(() =>{
          // resolve("Dell laptop purchesed!")
          resolve(this.dell)
        }, 3000)
      } else if(this.hpLaptop()){
        setTimeout(() =>{
          // resolve("HP laptop purchesed!")
          resolve(this.hp)
        }, 3000)
      } else {
        setTimeout(() =>{
          // reject("Laptop is not availabe on store")
          reject(this.not_available)
        }, 3000)
      }
    })

    byLaptop.then(res => {
      console.log('-Then code-->', res);
      this.laptop = res
    }).catch(rej => {
      console.log('-Catch code-->', rej);
      this.laptop = rej
    })
  }
}
