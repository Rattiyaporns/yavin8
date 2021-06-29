import { Component, OnInit } from '@angular/core';        
import { environment } from 'src/environments/environment';
import { OokbeeService } from '../services/ookbee.service';
import { YavinService } from './../services/yavin.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public readonly deviceId = environment.deviceId;
  resAccount = {
    'ookbee_numeric_id': null,
    'access_token': '',
    'access_token_expires_date': '',
    'device_id': ''
  };

  resYavinUser = {
    'profile_type': '',
    'profile_id': null,
    'ookbee_numeric_id': null,
    'access_token': '',
    'access_token_expires_date': '',
    'refresh_token': '',
    'is_new_register': false
  };
  checkLogin = false;
  constructor(private service: OokbeeService, private yavinService: YavinService) { }

  ngOnInit(): void {
  }

  login(username: any, password: any) {
    this.service.login(username, password, 'ookbee').subscribe((resAccount: any) => {
      this.resAccount.ookbee_numeric_id = resAccount.data.ookbeeNumericId;
      this.resAccount.access_token = resAccount.data.accessToken;
      this.resAccount.access_token_expires_date = resAccount.data.accessTokenExpiresDate;
      this.resAccount.device_id = this.deviceId;
      setTimeout(() => this.yavinService.login(this.resAccount, 'yavin-user').subscribe((resUser: any) => {
        this.checkLogin = true;
        this.resYavinUser = resUser;
        localStorage.setItem('access_token', this.resYavinUser.access_token);
        localStorage.setItem('refresh_token', this.resYavinUser.refresh_token);
      }, error => console.log(error)), 1000);
    });
  }

  refreshToken() {
    this.yavinService.refreshTokenApi().subscribe((res: any) => {
      console.log(res);
     }, error => console.log(error));
  }

  getProfile() {
    this.yavinService.getMeApi().subscribe((res: any) => {
      console.log(res);
     }, error => console.log(error));
  }
  
}
