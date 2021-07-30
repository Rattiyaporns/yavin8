import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { ProfileUserComponent } from './profile-user/profile-user.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '', component: ListUsersComponent
      },     
      {
        path: 'list-user', component: ListUsersComponent
      },
      {
        path: 'profile/:id', component: ProfileUserComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
