import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router){}

  ngOnInit(){}

  login(){
    sessionStorage.setItem("authToken", "d5fs65d4f65s4df")
    this.router.navigateByUrl('/')
  }
}
