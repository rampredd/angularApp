import { Component, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery/dist/jquery.js';
import { Router, NavigationEnd, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { LoaderService } from './services/loader.service';
import { Subscription } from 'rxjs';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'niti-aayog';
  isHome = false;
  showSidebar = true;
  isLoading: boolean;
  private subscription: Subscription;

  constructor(private router: Router, private loaderService: LoaderService, ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isHome = this.router.url === '/login' ? true : false;
      }
      if (event instanceof RouteConfigLoadStart) {
        this.isLoading = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.isLoading = false;
      }
    });

    this.router.events.subscribe((event) => {


    });
    this.subscription = this.loaderService.isLoading().subscribe(loading => {
      this.isLoading = loading;
    });
  }
  ngOnInit() { }

  onSidebarClick() {
    this.showSidebar = !this.showSidebar;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
