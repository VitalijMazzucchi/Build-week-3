import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IUserToken } from 'src/app/pages/auttenticazione/interfacce/i-user-token';
import { IUsers } from 'src/app/pages/auttenticazione/interfacce/i-users';
import { ServiceService } from 'src/app/pages/auttenticazione/service.service';
import { Observable, PartialObserver, interval } from 'rxjs';
import { filter } from 'rxjs/operators'
import { MatDialog } from '@angular/material/dialog';
import { ClientiDialogComponent } from '../clienti/clienti-dialog/clienti-dialog.component';

@Component({
  selector: 'app-dipendenti',
  templateUrl: './dipendenti.component.html',
  styleUrls: ['./dipendenti.component.scss']
})
export class DipendentiComponent implements OnInit {
  users: any = [];
  error = undefined;
  utLoggato = localStorage.getItem('Utente')
  luigino!: any;




  constructor(private service: ServiceService, private http: HttpClient, public dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.utLoggato !== null) {
      this.luigino = JSON.parse(this.utLoggato)
    }

    this.getAllUsers();
  }
  displayedColumns: string[] = ['firstname', 'lastname', 'role', 'email', 'Option'];
  dataSource = new MatTableDataSource(this.users);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  del(id: number) {
    this.service.delUt(id, this.luigino.accessToken).subscribe(
      (resp) => {
        console.log(resp);
      },
      (err) => {
        console.log(err);
        this.error = err.error;
      }
    )
    this.getAllUsers()
  }
  openDialog(obj: IUsers, id: number, rotta = '/homepage/dipendenti') {
    this.dialog.open(ClientiDialogComponent, {
      data: {
        id,
        obj,
        rotta
      }

    });
  }

  getAllUsers() {
    console.log(this.luigino)
    this.service.authSubject.subscribe(client => {
      this.http.get<IUsers[]>('http://localhost:3000/users', {
        headers: new HttpHeaders({ "Authorization": "Bearer " + this.luigino.accessToken })
      })
        .subscribe(
          resp => {
            this.users = resp;
            this.users = this.users.filter((ele: { roles: string; }) => ele.roles == 'admin');
            this.dataSource = new MatTableDataSource(this.users);
          },
          err => {
            console.log(err);
            this.error = err.error
          }
        )

    })
  }
}






