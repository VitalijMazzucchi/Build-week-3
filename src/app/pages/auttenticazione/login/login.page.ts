import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin } from '../interfacce/i-login';
import { ServiceService } from '../service.service';

@Component({
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  hide = true;
  erroreserver = undefined;
  @ViewChild('f') form!: NgForm;
  constructor(
    private serviceserver: ServiceService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}

  accedi() {
    console.log(this.form.value);
    this.serviceserver.login(this.form.value).subscribe(
      (resp) => {
        this.erroreserver = undefined;
        this.router.navigate(['homepage']);
      },
      (err) => {
        console.log(err);
        this.erroreserver = err.error;
      }
    );
  }
}
