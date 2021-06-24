import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MainService } from './main.service';
@Injectable({
  providedIn: 'root'
})
export class YavinService {
  public accessToken: any;
  public readonly yavinAuth = environment.yavinAuthKey;
  constructor(private service: MainService) {}

  login(body: any, type: any): Observable<any> {
    return this.service.post('/login', body, null, type);
  }

  logout(): Observable<any> {    
    this.accessToken = localStorage.getItem('access_token');
    return this.service.post('/logout', null, {
      headers: new HttpHeaders({
         'Authorization': 'Bearer ' + this.accessToken || '',
         'Yavin-API-Key': this.yavinAuth
      })
   }, '');
  }

}
