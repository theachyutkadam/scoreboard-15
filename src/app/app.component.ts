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
      this.isUserLoggedIn(event)
    })
  }

  ngOnInit() { }

  isUserLoggedIn(event: any){
    if(sessionStorage.getItem("authToken")){
      this.is_login = true
      if(event.url == '/login' || event.url == '/registration'){
        this.router.navigateByUrl("/")
      }
    } else {
      this.is_login = false
      if(event.url == '/registration'){} else {
        this.router.navigateByUrl("/login")
      }
    }
  }
}
