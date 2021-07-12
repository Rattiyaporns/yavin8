import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { UsersComponent } from './users/users.component';
import { PostsComponent } from './posts/posts.component';
import { PagesComponent } from './pages/pages.component';
import { GroupsComponent } from './groups/groups.component';


@NgModule({
  declarations: [
    UsersComponent,
    PostsComponent,
    PagesComponent,
    GroupsComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
