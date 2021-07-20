import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsComponent } from '../group/groups/groups.component';
import { PagesComponent } from '../page/pages/pages.component';
import { PostsComponent } from '../post/posts/posts.component';
import { UsersComponent } from '../user/users/users.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';


const routes: Routes = [
  { 
    path: 'privacy', 
    component: PrivacyComponent 
  },
  { 
    path: 'terms', 
    component: TermsComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
