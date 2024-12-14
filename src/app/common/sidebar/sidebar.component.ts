import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
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
