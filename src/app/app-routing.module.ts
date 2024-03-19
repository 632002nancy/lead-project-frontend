import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageComponent } from './page/page.component';
import { LeadsComponent } from './leads/leads.component';

const routes: Routes = [
  {path : "", component: WelcomeComponent},
  {path : "page", component: PageComponent},
  {path : "leads", component: LeadsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
