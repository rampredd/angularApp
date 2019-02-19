import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../services/dashboard.services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private route: Router, private fb: FormBuilder, private dashboardService: DashboardService) { }

  ngOnInit() {
    this.loginNitii();
  }

  loginNitii() {
    this.loginForm = this.fb.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }

  verifyLogin() {
    const username = this.loginForm.controls.Username.value;
    const password = this.loginForm.controls.Password.value;
    const params = {
      username: username,
      password: password
    };

    console.log(params, 'params');

    this.dashboardService.userLogin(params).subscribe(data => {
      console.log(data, 'data');
      this.route.navigate(['/dashboard']);
    },
      (error) => {
        console.log(`not able to login due to ${error}`);
      }
    );

  }
}
