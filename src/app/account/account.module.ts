import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { UsersComponent } from '../user/users/users.component';
import { PostsComponent } from '../post/posts/posts.component';
import { PagesComponent } from '../page/pages/pages.component';
import { GroupsComponent } from '../group/groups/groups.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';


@NgModule({
  declarations: [
    UsersComponent,
    PostsComponent,
    PagesComponent,
    GroupsComponent,
    PrivacyComponent,
    TermsComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
