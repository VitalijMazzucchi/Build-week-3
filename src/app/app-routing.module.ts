import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepagePage } from './components/homepage/homepage.page';
import { ClientiComponent } from './components/homepage/sidebar/clienti/clienti.component';
import { CreaFattureComponent } from './components/homepage/sidebar/crea-fatture/crea-fatture.component';
import { DipendentiComponent } from './components/homepage/sidebar/dipendenti/dipendenti.component';
import { FattureComponent } from './components/homepage/sidebar/fatture/fatture.component';
import { IndiceComponent } from './components/homepage/sidebar/indice/indice.component';
import { RegisterPage } from './components/homepage/sidebar/register/register.page';
import { GuardGuard } from './pages/auttenticazione/guard.guard';

import { LoginPage } from './pages/auttenticazione/login/login.page';
import { PagenotfoudPage } from './pages/pagenotfoud/pagenotfoud.page';

const routes: Routes = [
  { path: 'Login', component: LoginPage },
  { path: '', pathMatch: 'full', redirectTo: 'Login' },
  {
    path: 'homepage',
    component: HomepagePage,
    canActivate: [GuardGuard],

    children: [
      {
        path: '',
        component: IndiceComponent,
      },
      { path: 'indice', component: IndiceComponent, canActivate: [GuardGuard] },
      { path: 'clienti', component: ClientiComponent, canActivate: [GuardGuard], },
      { path: 'dipendenti', component: DipendentiComponent, canActivate: [GuardGuard] },
      { path: 'fatture', component: FattureComponent, canActivate: [GuardGuard] },
      { path: 'Addfatture', component: CreaFattureComponent, canActivate: [GuardGuard] },
      { path: 'register', component: RegisterPage, canActivate: [GuardGuard] },

    ],
  },

  { path: '**', component: PagenotfoudPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
