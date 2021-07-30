import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ShareModule } from '../share/share.module';
import { ListUsersComponent } from './list-users/list-users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileUserComponent } from './profile-user/profile-user.component';
import { ConfirmUpdateComponent } from './dialog/confirm-update/confirm-update.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ListUsersComponent,
    ProfileUserComponent,
    ConfirmUpdateComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ShareModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [    
    ListUsersComponent
  ],
  providers: [
    DatePipe
  ]
})
export class DashboardModule { }
