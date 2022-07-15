import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomepagePage } from './homepage.page';
import { ClientiComponent } from './sidebar/clienti/clienti.component';
import { FattureComponent } from './sidebar/fatture/fatture.component';
import { IndiceComponent } from './sidebar/indice/indice.component';
import { RegisterPage } from './sidebar/register/register.page';

const routes: Routes = [
  /* {
    path: '',
    component: HomepagePage,
    children: [
      { path: 'indice', component: IndiceComponent },
      { path: 'clienti', component: ClientiComponent },
      { path: 'fatture', component: FattureComponent },
      { path: 'register', component: RegisterPage },
      { path: '', pathMatch: 'full', redirectTo: 'indice' },
    ],
  }, */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InternoRoutingModule {}
