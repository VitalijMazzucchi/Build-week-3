import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientiComponent } from './sidebar/clienti/clienti.component';
import { FattureComponent } from './sidebar/fatture/fatture.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InternoRoutingModule } from './interno-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';

import { HomepagePage } from './homepage.page';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RegisterPage } from './sidebar/register/register.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IndiceComponent } from './sidebar/indice/indice.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatRippleModule } from '@angular/material/core';
import { CreaFattureComponent } from './sidebar/crea-fatture/crea-fatture.component';
import { DipendentiComponent } from './sidebar/dipendenti/dipendenti.component';
import { ClientiDialogComponent } from './sidebar/clienti/clienti-dialog/clienti-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FatturaClienteComponent } from './sidebar/clienti/fattura-cliente/fattura-cliente.component';
import { ModificaFattureComponent } from './sidebar/fatture/modifica-fatture/modifica-fatture.component';

@NgModule({
  declarations: [
    ClientiComponent,
    FattureComponent,
    HomepagePage,
    RegisterPage,
    IndiceComponent,
    CreaFattureComponent,
    DipendentiComponent,
    FatturaClienteComponent,
    ClientiDialogComponent,
    ModificaFattureComponent,

  ],
  imports: [
    CommonModule,
    InternoRoutingModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    FormsModule,
    MatPaginatorModule,
    HttpClientModule,
    MatNativeDateModule,
    MatTableModule,
    MatRippleModule,
    MatDialogModule
  ],
})
export class InternoModule { }
