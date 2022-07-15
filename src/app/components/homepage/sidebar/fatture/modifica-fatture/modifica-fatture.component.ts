import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/pages/auttenticazione/service.service';
import { Fatture } from '../../crea-fatture/fatture-Interface';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modifica-fatture',
  templateUrl: './modifica-fatture.component.html',
  styleUrls: ['./modifica-fatture.component.scss']
})
export class ModificaFattureComponent implements OnInit {

  selected = 'option1';
  selected2 = '';
  error = undefined;
  clienti: any = [];
  fatture: Fatture[] = [];
  utLoggato = localStorage.getItem('Utente')
  luigino!: any;
  object: any;

  @ViewChild('f') form!: NgForm;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ServiceService,
    private router: Router,
    private http: HttpClient,
    public dialog: MatDialog) { }

  ngOnInit(): void {

    if (this.utLoggato !== null) {
      this.luigino = JSON.parse(this.utLoggato)
    }
    this.getclienti()
    this.object = {
      data: this.data.obj.data,
      stato: this.data.obj.stato,
      causale: this.data.obj.causale,
      importo: this.data.obj.importo,
      cliente: this.data.obj.cliente,
    }
    console.log(this.data.obj.clienti)

  }




  mdFat() {
    this.service.patchFt(this.form.value, this.luigino.accessToken, this.data.id).subscribe(
      (resp) => {
        console.log(resp);
        this.fatture = resp;
      },
      (err) => {
        console.log(err);
        this.error = err.error;
      }
    );
  };

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

