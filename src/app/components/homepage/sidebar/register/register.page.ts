import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/pages/auttenticazione/service.service';

@Component({
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  @ViewChild('fr') form!: NgForm;

  selected = 'option2';
  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void { }
  registra() {
    this.service.registrazione(this.form.value).subscribe(
      (resp) => {
        this.router.navigate(['homepage/indice']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
