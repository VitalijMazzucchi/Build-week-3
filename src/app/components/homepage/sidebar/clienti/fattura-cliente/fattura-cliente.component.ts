import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServiceService } from 'src/app/pages/auttenticazione/service.service';
import { IUsers } from 'src/app/pages/auttenticazione/interfacce/i-users';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Fatture } from '../../crea-fatture/fatture-Interface';

@Component({
  selector: 'app-fattura-cliente',
  templateUrl: './fattura-cliente.component.html',
  styleUrls: ['./fattura-cliente.component.scss']
})
export class FatturaClienteComponent implements OnInit {
  users: any;
  fatture: Fatture[] = [];
  error = undefined;
  utLoggato = localStorage.getItem('Utente')
  luigino!: any;

  constructor(private service: ServiceService,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any) { }



  ngOnInit(): void {
    if (this.utLoggato !== null) {
      this.luigino = JSON.parse(this.utLoggato)
    }
    console.log(this.data.id)
    this.getAllFat()
  }

  getAllFat() {
    console.log('Chiamata Ajax al server');
    this.service.authSubject.subscribe((userLogin) => {
      this.http.get<[]>('http://localhost:3000/fatture').subscribe(
        (resp) => {
          console.log(resp);
          this.fatture = resp;
          this.fatture = this.fatture.filter((ele) => ele.cliente == this.data.id);
        },
        (err) => {
          console.log(err);
          this.error = err.error;
        }
      );
    });
  }


  /* getAllUsers() {
    this.service.authSubject.subscribe(client => {
      this.http.get<IUsers[]>('http://localhost:3000/users', {
        headers: new HttpHeaders({ "Authorization": "Bearer " + this.luigino.accessToken })
      })
        .subscribe(
          resp => {
            this.users = resp;
             this.users = this.users.filter((ele: { id: number; }) => ele.id == "" );
          },
          err => {
            console.log(err);
            this.error = err.error
          }
        )

    })
  }  */

}
