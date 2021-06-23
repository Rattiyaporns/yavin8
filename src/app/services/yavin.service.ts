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
  
  constructor(private service: MainService) { }

  login(body: any, type: any): Observable<any> {
    return this.service.post('/login', body, null, type);
  }

}
