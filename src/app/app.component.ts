import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'scoreboard-15';
  is_login: boolean = false

  constructor(private router: Router){
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.isUserLoggedIn()
      // if(this.headerComponent) {
      //   this.headerComponent.checkAnnouncements("all")
      // }
    })
  }

  ngOnInit() { this.isUserLoggedIn() }

  isUserLoggedIn(){
    if(sessionStorage.getItem("authToken")){
      this.is_login = true
    } else {
      this.is_login = false
      this.router.navigateByUrl("/login")
    }
  }
}
