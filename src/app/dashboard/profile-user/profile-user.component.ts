import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { YavinService } from 'src/app/services/yavin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmUpdateComponent } from '../dialog/confirm-update/confirm-update.component';

export interface ListUsers {
  user_name: string,
  display_name: string,
  category_ids: any,
  avatar_url: string,
  cover_url: string,
  summary: string,
  about: string,
  avatar: string
}

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss']
})
export class ProfileUserComponent implements OnInit {
  id: any;
  imgUser: any;
  profileForm!: FormGroup;
  roles: any;
  defaultRole: any;
  listUser = {} as ListUsers;
  data: any;
  constructor(
    private formBuilder: FormBuilder,
    private yavinService: YavinService,
    private route: ActivatedRoute,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getProfile(this.id);
    });
    this.getRole();
  }

  getProfile(id: any) {
    this.yavinService.getUserApi(id).subscribe((res: any) => {
      this.data = res;
      this.profileForm = this.formBuilder.group({
        userId: [res.profile_id],
        displayName: [res.display_name],
        role: [res.role],
        username: [res.user_name],
        email: [res.email],
        createDate: [res.created_date_utc],
        updateDate: [res.modified_date_utc],
        about: [res.about],
        cover: [res.cover_url],
        summary: [res.summary],
        following: [res.stat.following_count],
        follower: [res.stat.follower_count]
      });

    }, error => console.log(error));

  }

  getRole() {
    this.yavinService.getRoleApi().subscribe((res: any) => {
      this.roles = res;
    }, error => console.log(error));

  }

  onSubmit() {
    this.listUser.user_name = this.profileForm.value.username || '';
    this.listUser.display_name = this.profileForm.value.displayName || '';
    // this.listUser.category_ids = null;
    this.listUser.cover_url = this.profileForm.value.cover || '';
    this.listUser.avatar_url = this.data.avatar_url || '';
    this.listUser.summary = this.profileForm.value.summary || '';
    this.listUser.about = this.profileForm.value.about || '';
    const register = this.dialog.open(ConfirmUpdateComponent, {
      data: this
   });
   register.afterClosed().subscribe(() => {
   });
  }

  

}
