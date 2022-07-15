import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/pages/auttenticazione/service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-crea-fatture',
  templateUrl: './crea-fatture.component.html',
  styleUrls: ['./crea-fatture.component.scss'],
})
export class CreaFattureComponent implements OnInit {
  selected = 'option1';
  selected2 = '';
  error = undefined;
  clienti: any = [];

  utLoggato = localStorage.getItem('Utente')
  luigino!: any;

  @ViewChild('f') form!: NgForm;
  constructor(private service: ServiceService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    if (this.utLoggato !== null) {
      this.luigino = JSON.parse(this.utLoggato)
    }

    this.getclienti()
  }

  creaFatt() {
    console.log(this.form.value);
    this.service.addFatture(this.form.value).subscribe((resp) => {
      this.router.navigate(['homepage/fatture']);
    });
  }


  getclienti() {
    this.service.authSubject.subscribe(client => {
      this.http.get('http://localhost:3000/users', {
        headers: new HttpHeaders({ "Authorization": "Bearer " + this.luigino.accessToken })
      })
        .subscribe(
          resp => {
            this.clienti = resp;
            this.clienti = this.clienti.filter((ele: { roles: string; }) => ele.roles == "cliente");
          },
          err => {
            console.log(err);
            this.error = err.error
          }
        )

    })
  }
}
