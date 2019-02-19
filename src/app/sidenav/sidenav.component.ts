import { Component, OnInit, Input } from '@angular/core';
import { DashboardService } from '../services/dashboard.services';
import { Router } from '@angular/router';
import { AuthTokenService } from '../services/auth-token.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.less']
})
export class SidenavComponent implements OnInit {
  @Input() showSidebar: boolean;
  constructor(private dashboardService: DashboardService, private router: Router, private authTokenService: AuthTokenService) { }

  ngOnInit() {
  }

  logout() {
    this.dashboardService.userLogout();
    this.authTokenService.clear();
    this.router.navigate(['/login']);
  }

}
