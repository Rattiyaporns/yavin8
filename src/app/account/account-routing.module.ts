import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsComponent } from './groups/groups.component';
import { PagesComponent } from './pages/pages.component';
import { PostsComponent } from './posts/posts.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
  { 
    path: 'users/:id', 
    component: UsersComponent 
  }, 
  { 
    path: 'posts/:id', 
    component: PostsComponent 
  },
  { 
    path: 'pages/:id', 
    component: PagesComponent 
  },
  { 
    path: 'groups/:id', 
    component: GroupsComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
