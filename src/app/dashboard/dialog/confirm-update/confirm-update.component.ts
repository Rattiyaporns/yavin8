import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { YavinService } from 'src/app/services/yavin.service';
import { ListUsers } from '../../profile-user/profile-user.component';

@Component({
  selector: 'app-confirm-update',
  templateUrl: './confirm-update.component.html',
  styleUrls: ['./confirm-update.component.scss']
})
export class ConfirmUpdateComponent implements OnInit {

  constructor(private yavinService: YavinService, private dialogRef: MatDialogRef<ConfirmUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  onClickConfirm() {
    this.changeProfile(this.data.listUser);
  }
  changeProfile(listUser: ListUsers) {
    this.yavinService.changeProfileApi(this.data.id, listUser).subscribe((res: any) => {
    this.changeRole(this.data.profileForm.value.role);
    }, error => console.log(error));
  }

  changeRole(role: string) {
    this.yavinService.changeRoleApi(this.data.id, role).subscribe((res: any) => {
      this.dialogRef.close(true);
      alert('Update Success');
    }, error => console.log(error));
  }
}
