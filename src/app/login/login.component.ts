import { Component, OnInit } from '@angular/core';                                                                                                                                                                    
import { MatSnackBar } from '@angular/material/snack-bar';
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
  data = {
    'ookbee_numeric_id': null,
    'access_token': '',
    'access_token_expires_date': '',
    'device_id': ''
  };

  constructor(private service: OokbeeService, private yavinService: YavinService) { }

  ngOnInit(): void {
  }

  onCilckButton(username: any, password: any) {
    this.service.login(username, password, 'ookbee').subscribe((resAccount: any) => {
      this.data.ookbee_numeric_id = resAccount.data.ookbeeNumericId;
      this.data.access_token = resAccount.data.accessToken;
      this.data.access_token_expires_date = resAccount.data.accessTokenExpiresDate;
      this.data.device_id = this.deviceId;
      setTimeout(() => this.yavinService.login(this.data, 'yavin').subscribe((res: any) => {
        console.log('success');
      }, error => console.log(error)), 1000);
    });
  }

}
