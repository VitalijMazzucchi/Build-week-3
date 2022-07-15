import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { LoginPage } from './login/login.page';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { StellineComponent } from './stelline/stelline.component';
import { NavbarComponent } from 'src/app/components/homepage/navbar/navbar.component';
@NgModule({
  declarations: [LoginPage, NavbarComponent, StellineComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,

    MatIconModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSelectModule,
  ],
})
export class AuttenticazioneModule {}
