import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from 'src/app/pages/auttenticazione/service.service';
import { CreaFattureComponent } from '../crea-fatture/crea-fatture.component';
import { Fatture } from '../crea-fatture/fatture-Interface';
import { ModificaFattureComponent } from './modifica-fatture/modifica-fatture.component';

@Component({
  selector: 'app-fatture',
  templateUrl: './fatture.component.html',
  styleUrls: ['./fatture.component.scss'],
})
export class FattureComponent {
  fatture: [] = [];
  error = undefined;
  constructor(private service: ServiceService,
    private http: HttpClient,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllFat();
  }

  displayedColumns: string[] = ['stato', 'causale', 'data', 'importo', 'Option'];
  dataSource = new MatTableDataSource(this.fatture);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getAllFat() {
    console.log('Chiamata Ajax al server');
    this.service.authSubject.subscribe((userLogin) => {
      this.http.get<[]>('http://localhost:3000/fatture').subscribe(
        (resp) => {
          console.log(resp);
          this.fatture = resp;
          this.dataSource = new MatTableDataSource(this.fatture);
        },
        (err) => {
          console.log(err);
          this.error = err.error;
        }
      );
    });
  }

  del(id: number) {
    this.service.delFatture(id).subscribe(
      (resp) => {
        console.log(resp);
      },
      (err) => {
        console.log(err);
        this.error = err.error;
      }
    )
    this.getAllFat()
  }
  mdFat(id: number, obj: Fatture) {
    this.dialog.open(ModificaFattureComponent, {
      data: {
        id,
        obj
      }

    })
  }


}


