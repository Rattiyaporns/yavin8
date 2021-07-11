import { Component, OnInit } from '@angular/core';        
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { OokbeeService } from '../services/ookbee.service';
import { YavinService } from './../services/yavin.service';
import { Title, Meta } from '@angular/platform-browser';
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
  
  metaData= {
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
  constructor(private formBuilder: FormBuilder,private service: OokbeeService,
    private yavinService: YavinService, private router: Router, private route: ActivatedRoute,
    private title: Title, private meta: Meta, private serviceYavin: YavinService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.type = params['type'];
      this.id = params['id'];
      console.log(params['type']);
      if (this.type === 'users') {
        this.metaData.title = 'users';
        this.metaData.url = this.url + 'users/' + this.id;
      } else if (this.type === 'pages') {
        this.metaData.title = 'pages';
        this.metaData.url = this.url + 'pages/' + this.id;
      } else if (this.type === 'groups') {
        this.metaData.title = 'groups';
        this.metaData.url = this.url + 'groups/' + this.id;
      } else if (this.type === 'posts') {
        this.metaData.title = 'posts';
        this.metaData.url = this.url + 'posts/' + this.id;
      }
   });
  this.setMetaDataFacebook(this.metaData);
  this.loginForm = this.formBuilder.group({
    username: [''],
    password: ['']
  });
    this.checkLogin = false;    
  }

  login(username: any, password: any) {
    console.log(this.loginForm);
    this.service.login(username, password, 'ookbee').subscribe((resAccount: any) => {
      this.resAccount.ookbee_numeric_id = resAccount.data.ookbeeNumericId;
      this.resAccount.access_token = resAccount.data.accessToken;
      this.resAccount.access_token_expires_date = resAccount.data.accessTokenExpiresDate;
      this.resAccount.device_id = this.deviceId;
      setTimeout(() => this.yavinService.login(this.resAccount, 'yavin-user').subscribe((resUser: any) => {
        console.log(resUser);
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
      console.log(res);
     }, error => console.log(error));
  }

  getProfile() {
    this.yavinService.getMeApi().subscribe((res: any) => {
      console.log(res);
     }, error => console.log(error));
  }

  getUser() { 
    this.serviceYavin.getUserApi().subscribe((res: any) => {
      this.metaData.title = res.display_name + res.stat.follower_count;
      this.metaData.image = res.avatar_url;
      this.metaData.type = 'profile';
      this.metaData.description = res.about;
      this.title.setTitle('Wiseday');  
      if ( this.metaData.title) {
        this.setMetaDataFacebook(this.metaData);
        this.setMetaTwitter(this.metaData);
      }    
    }, error => console.log('error', error)); 
  }

  setMetaDataFacebook(metaData: any) {
    console.log(metaData);
    this.meta.addTags([
      { name: 'og:type', content: metaData.type },
      { name: 'og:url', content: metaData.url },
      { name: 'og:image', content: metaData.image },
      { name: 'og:description', content: metaData.description},
      { name: 'og:title', content: metaData.title}
    ]);
  }

  setMetaTwitter(metaData: any) {
      this.meta.addTag({name: 'description', content: metaData.description});
      this.meta.addTag({name: 'twitter:card', content: 'summary'});
      this.meta.addTag({name: 'twitter:title', content: metaData.title});
      this.meta.addTag({name: 'twitter:description', content: metaData.description});
      this.meta.addTag({name: 'twitter:text:description', content: metaData.description});
      this.meta.addTag({name: 'twitter:image', content:  metaData.image});
  }
  
}
