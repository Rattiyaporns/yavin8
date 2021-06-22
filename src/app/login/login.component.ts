import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { YavinService } from '../yavin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private service: YavinService) { }

  ngOnInit(): void {
  }

  onCilckButton(username:any , password:any) {
    console.log(username, password);
    this.service.login(username, password).subscribe((data:any) => {
      console.log(data);
    });  
  }

}
