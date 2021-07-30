import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupRoutingModule } from './group-routing.module';
import { GroupsComponent } from './groups/groups.component';


@NgModule({
  declarations: [
    GroupsComponent
  ],
  imports: [
    CommonModule,
    GroupRoutingModule
  ]
})
export class GroupModule { }
