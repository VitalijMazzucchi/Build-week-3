import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/pages/auttenticazione/service.service';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { IUsers } from 'src/app/pages/auttenticazione/interfacce/i-users';
@Component({
  selector: 'app-clienti-dialog',
  templateUrl: './clienti-dialog.component.html',
  styleUrls: ['./clienti-dialog.component.scss']
})
export class ClientiDialogComponent implements OnInit {
  @ViewChild('fr') form!: NgForm;
  object!: any;

  selected = 'option2';
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private service: ServiceService, private router: Router,
    public dialog: MatDialog) { }




  ngOnInit(): void {
    console.log(this.data.obj)
    this.object = {
      firstname: this.data.obj.firstname,
      lastname: this.data.obj.lastname,
      email: this.data.obj.email,
      password: '',
      roles: this.data.obj.roles,
    }



  }

  registra() {
    this.service.patchUt(this.form.value, this.data.at, this.data.id).subscribe(
      (resp) => {

      },
      (err) => {
        console.log(err);
      }
    );

    this.router.navigate([this.data.rotta])
    this.dialog.closeAll();

  }

}

