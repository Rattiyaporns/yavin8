import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { OokbeeService } from '../services/ookbee.service';
import { YavinService } from './../services/yavin.service';
import { Title, Meta } from '@angular/platform-browser';
import { take } from 'rxjs/operators';
import { analyzeAndValidateNgModules } from '@angular/compiler';

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

  metaData = {
    title: '',
    description: '',
    image: '',
    type: '',
    url: '',
  };
  url = 'https://yavin-test.azurewebsites.net/';
  type: any;
  id: any;
  checkLogin = false;
  loginForm: any;
  constructor(private formBuilder: FormBuilder, private service: OokbeeService,
    private yavinService: YavinService, private router: Router, private route: ActivatedRoute,
    private title: Title, private meta: Meta, private serviceYavin: YavinService) { }

  async ngOnInit(): Promise<any> {
    this.route.params.subscribe(params => {
      this.type = params['type'];
      this.id = params['id'];
      this.title.setTitle('Wiseday');
      this.getType(this.type, this.id);

    });
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });
    this.checkLogin = false;
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
        this.router.navigateByUrl('/dashboard');
      }, error => console.log(error)), 1000);
    });
  }

  refreshToken() {
    this.yavinService.refreshTokenApi().subscribe((res: any) => {
    }, error => console.log(error));
  }

  getProfile() {
    this.yavinService.getMeApi().subscribe((res: any) => {
    }, error => console.log(error));
  }

  async getType(type: any, id: any) {
    if (type === 'users') {
      var response = await this.serviceYavin.getUserApi(id)
        .pipe(take(1))
        .toPromise();
      this.metaData.title = response.display_name + response.stat.follower_count;
      this.metaData.url = this.url + 'users/' + id;
      this.metaData.image = response.avatar_url;
      this.metaData.type = 'profile';
      this.metaData.description = response.about;
    } else if (type === 'pages') {
      this.metaData.title = 'pages';
      this.metaData.url = this.url + 'pages/' + id;
    } else if (type === 'groups') {
      this.metaData.title = 'groups';
      this.metaData.url = this.url + 'groups/' + id;
    } else if (type === 'posts') {
      this.metaData.title = 'posts';
      this.metaData.url = this.url + 'posts/' + id;
    }
    this.setSocialTags(this.metaData);
  }

  setSocialTags(metaData: any) {
    console.log(metaData);
    this.meta.addTags([
      //facebook
      { property: 'og:type', content: metaData.type },
      { property: 'og:url', content: metaData.url },
      { property: 'og:image', content: metaData.image },
      { property: 'og:description', content: metaData.description },
      { property: 'og:title', content: metaData.title },
      //twitter
      { property: 'twitter:card', content: 'summary' },
      { property: 'twitter:title', content: metaData.title },
      { property: 'twitter:description', content: metaData.description },
      { property: 'twitter:image', content: metaData.image },
      { property: 'twitter:url', content: metaData.url },
    ]);
  }

}
