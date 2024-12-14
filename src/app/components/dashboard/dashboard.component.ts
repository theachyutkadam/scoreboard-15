import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(
    private router: Router,
    private toastr: ToastrService
  ){}

  logout(){
    sessionStorage.clear()
    this.router.navigateByUrl('/login')
    this.toastr.success('Logout Successfully', 'ByeBye!');
  }
}
