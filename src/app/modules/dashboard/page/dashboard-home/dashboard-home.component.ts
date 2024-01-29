import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: [],
})
export class DashboardHomeComponent {

    constructor(private cookie: CookieService, private router: Router){}

    handleLogout(): void{
      this.cookie.delete('USER_INFO');
      void this.router.navigate(['/home']);
    }
}
