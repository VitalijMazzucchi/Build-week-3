import { Component, OnInit } from '@angular/core';
import { IUserToken } from 'src/app/pages/auttenticazione/interfacce/i-user-token';
import { IUsers } from 'src/app/pages/auttenticazione/interfacce/i-users';
import { ServiceService } from 'src/app/pages/auttenticazione/service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-indice',
  templateUrl: './indice.component.html',
  styleUrls: ['./indice.component.scss'],
})

export class IndiceComponent implements OnInit {


  centered = false;
  disabled = false;
  unbounded = false;
  error = undefined;
  radius!: number;
  color!: string;

  myname = '';
  sname = '';
  mymail = '';
  myrole = '';
  fatture: any | [] = [];
  dipendenti: any = [];
  clienti: any = [];
  utLoggato = localStorage.getItem('Utente')
  luigino!: any;
  constructor(private service: ServiceService, private http: HttpClient) { }

  ngOnInit(): void {
    if (this.utLoggato !== null) {
      this.luigino = JSON.parse(this.utLoggato)
    }

    this.service.authSubject.subscribe(val => {
      if (val !== null) {
        this.myname = `${val?.user.firstname} `;
        this.sname = `${val?.user.lastname}`;
        this.mymail = `${val?.user.email}`;
        this.myrole = `${val?.user.roles.toUpperCase()}`;

      } else {
        this.myname = 'Utente indefinito errore';
      }
    })
    this.getDipendenti();
    this.getClienti();
    this.getAllFat();
  }

  getDipendenti() {
    console.log(this.luigino)
    this.service.authSubject.subscribe(client => {
      this.http.get<IUsers[]>('http://localhost:3000/users', {
        headers: new HttpHeaders({ "Authorization": "Bearer " + this.luigino.accessToken })
      })
        .subscribe(
          resp => {
            this.dipendenti = resp;
            this.dipendenti = this.dipendenti.filter((ele: { roles: string; }) => ele.roles == 'admin');

          },
          err => {
            console.log(err);
            this.error = err.error
          }
        )

    })
  }

  getClienti() {
    console.log(this.luigino)
    this.service.authSubject.subscribe(client => {
      this.http.get<IUsers[]>('http://localhost:3000/users', {
        headers: new HttpHeaders({ "Authorization": "Bearer " + this.luigino.accessToken })
      })
        .subscribe(
          resp => {
            this.clienti = resp;
            this.clienti = this.clienti.filter((ele: { roles: string; }) => ele.roles == 'cliente');
          },
          err => {
            console.log(err);
            this.error = err.error
          }
        )

    })
  }
  getAllFat() {
    console.log('Chiamata Ajax al server');
    this.service.authSubject.subscribe((userLogin) => {
      this.http.get<[]>('http://localhost:3000/fatture').subscribe(
        (resp) => {
          console.log(resp);
          this.fatture = resp;

        },
        (err) => {
          console.log(err);
          this.error = err.error;
        }
      );
    });
  }

}

