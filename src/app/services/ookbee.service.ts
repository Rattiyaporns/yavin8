import { HttpHeaders } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MainService } from './main.service';

@Injectable({
  providedIn: 'root'
})
export class OokbeeService {

  public readonly appCode = environment.ookbeeAppCode;
  public readonly deviceId = environment.deviceId;
  constructor(private service: MainService) { }

  login(id: string, password: string, type: any): Observable<any> {
    const data = { 'ookbeeId': id, 'password': password, 'appCode': this.appCode, 'deviceId': this.deviceId };
    return this.service.post('/auth', data, null, type);
  }
}
