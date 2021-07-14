import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { MainService } from './main.service';
@Injectable({
  providedIn: 'root'
})
export class YavinService {
  
  public accessToken: any;
  public refreshToken: any;
  public readonly yavinAuth = environment.yavinAuthKey;
  public readonly contentType = environment.ContentType;

  constructor(private service: MainService) {
  }

  getLocalStorage() {    
    this.accessToken = localStorage.getItem('access_token');
    this.refreshToken = localStorage.getItem('refresh_token');
  }

  login(body: any, type: any): Observable<any> {
    return this.service.post('/login', body, null, type);
  }

  logout(): Observable<any> {    
    return this.service.post('/logout', null, {
      headers: new HttpHeaders({
         'Authorization': 'Bearer ' + this.accessToken || ''
         ,'Yavin-API-Key': this.yavinAuth
      })
   }, 'yavin-user');
  }

  refreshTokenApi() {
    this.getLocalStorage();
    let token = {'refresh_token': this.refreshToken};
    return this.service.post('/token/refresh', token, {
      headers: new HttpHeaders({
         'Authorization': 'Bearer ' + this.accessToken || ''
      })
   }, 'yavin-user');
  }

  getMeApi() {
    this.getLocalStorage();
    return this.service.get('/me', {
      headers: new HttpHeaders({
         'Authorization': 'Bearer ' + this.accessToken || ''
         ,'Yavin-API-Key': this.yavinAuth
      })
   }, 'yavin-account');
  }

  getUserApi(id: any) {
    // this.getLocalStorage();
    return this.service.get('/' + id , {
      headers: new HttpHeaders({
         'Yavin-API-Key': this.yavinAuth
      })
   }, 'yavin-user');
  }

  getPostApi(id: any) {
    return this.service.get('/' + id , {
      headers: new HttpHeaders({
         'Yavin-API-Key': this.yavinAuth
      })
   }, 'yavin-post');
  }

  getPageApi(id: any) {
    return this.service.get('/' + id , {
      headers: new HttpHeaders({
         'Yavin-API-Key': this.yavinAuth
      })
   }, 'yavin-page');
  }

  getGroupApi(id: any) {
    return this.service.get('/' + id + '?member_status=' + true , {
      headers: new HttpHeaders({
         'Yavin-API-Key': this.yavinAuth
      })
   }, 'yavin-gruop');
  }

  getTermOfUse() {
    return this.service.get('/agreements/terms', {
      headers: new HttpHeaders({
         'Yavin-API-Key': this.yavinAuth
      })
   }, 'yavin-agreement');
  }

  getPolicyPrivacy() {
    return this.service.get('/agreements/privacy', {
      headers: new HttpHeaders({
         'Yavin-API-Key': this.yavinAuth
      })
   }, 'yavin-agreement');
  }

}
