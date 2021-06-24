import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
   providedIn: 'root'
})
export class MainService {

   public readonly urlOokBee = environment.serviceUrlOokBee;
   public readonly urlYavin = environment.serviceUrlYavin;
   public readonly ookbeeAuth = environment.ookbeeAuthKey;
   public readonly yavinAuth = environment.yavinAuthKey;
   public readonly contentType = environment.ContentType;

   constructor(private http: HttpClient) { }

   private createHttpOptions(options?: any, json?: boolean, type?: any): any {
      let listHeaders = {};
      if (options && options.headers) {
         return options;
      }

      listHeaders = (type === 'ookbee') ? { 'Ookbee-Auth-Rest-API-Key': this.ookbeeAuth } : { 'Yavin-API-Key': this.yavinAuth };
      let headers = new HttpHeaders(listHeaders);
      
      if (json !== false) {
         headers = headers.append('Content-Type', this.contentType);
      }
      if (options) {
         options.headers = headers;
      } else {
         options = { headers };
      }
      return options;
   }

   private getUrl(api: string, type?: any): string {
      const url = (type === 'ookbee') ? this.urlOokBee : this.urlYavin;
      return url + (api.startsWith('/') ? api : '/' + api);
   }

   get(api: string, options?: any, type?: any): Observable<any> {
      return this.http.get(this.getUrl(api, type), this.createHttpOptions(options, true, type))
         .pipe(catchError(this.handleError(api)));
   }

   post(api: string, body?: any, options?: any, type?: any): Observable<any> {
      let json = false;
      if (typeof body === 'object' && !(body instanceof FormData)) {
         body = JSON.stringify(body);
         json = true;
      }
      return this.http.post(this.getUrl(api, type), body, this.createHttpOptions(options, true, type))
         .pipe(catchError(this.handleError(api)));
   }

   put(api: string, body?: any, options?: any, type?: any): Observable<any> {
      let json = false;
      if (typeof body === 'object' && !(body instanceof FormData)) {
         body = JSON.stringify(body);
         json = true;
      }
      return this.http.put(this.getUrl(api, type), body, this.createHttpOptions(options, true, type))
         .pipe(catchError(this.handleError(api)));
   }

   delete(api: string, options?: any, type?: any): Observable<any> {
      return this.http.delete(this.getUrl(api, type), this.createHttpOptions(options, true, type))
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
}
