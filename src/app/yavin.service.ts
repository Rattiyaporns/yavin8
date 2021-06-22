import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class YavinService {
  public readonly url = environment.serviceUrl;
  constructor(private http: HttpClient) { }

  private createHttpOptions(options?: any, json?: boolean): any {
    if (options && options.headers) {
       return options;
    }

    let headers = new HttpHeaders({
       'Ookbee-Auth-Rest-API-Key': 'Ae8V/KtpwAEh0It7SRuW59RZm3/INDX0Wh6xpeSqLKHuAFdJU0VEQVlfMDAz',
    });
    if (json !== false) {
       headers = headers.append('Content-Type', 'application/json;charset=utf-8');
    }
    if (options) {
       options.headers = headers;
    } else {
       options = {headers};
    }
    return options;
 }

 private getUrl(api: string): string {
    return this.url + (api.startsWith('/') ? api : '/' + api);
 }

 get(api: string, options?: any): Observable<any> {
    return this.http.get(this.getUrl(api), this.createHttpOptions(options))
       .pipe(catchError(this.handleError(api)));
 }

 post(api: string, body?: any, options?: any): Observable<any> {
    let json = false;
    if (typeof body === 'object' && !(body instanceof FormData)) {
       body = JSON.stringify(body);
       json = true;
    }
    return this.http.post(this.getUrl(api), body, this.createHttpOptions(options, json))
       .pipe(catchError(this.handleError(api)));
 }

 put(api: string, body?: any, options?: any): Observable<any> {
    let json = false;
    if (typeof body === 'object' && !(body instanceof FormData)) {
       body = JSON.stringify(body);
       json = true;
    }
    return this.http.put(this.getUrl(api), body, this.createHttpOptions(options, json))
       .pipe(catchError(this.handleError(api)));
 }

 delete(api: string, options?: any): Observable<any> {
    return this.http.delete(this.getUrl(api), this.createHttpOptions(options))
       .pipe(catchError(this.handleError(api)));
 }

 private handleError(api: string) {
  return (error: any): Observable<any> => {
     let alert = true;
     let status = 0;
     let message: string;
     if (error instanceof HttpErrorResponse) {
        status = error.status;
        if (error.status === 401) {
          console.error(error);
        }
        if (error.status === 0) {
          console.error(error.status);
        }
        // console.error(`${error.status} ${message}`);
     } else {
        console.error(error);
     }
     return throwError(new Error());
  };
 }

 login(id: string, password: string): Observable<any> {
  const data = {'ookbeeId': id, 'password': password, 'appCode': 'WISEDAY_003' , 'deviceId': 'dev/1234'};
  return this.post('/auth', data, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Ookbee-Auth-Rest-API-Key': 'Ae8V/KtpwAEh0It7SRuW59RZm3/INDX0Wh6xpeSqLKHuAFdJU0VEQVlfMDAz'
    })
  });
 }
}
