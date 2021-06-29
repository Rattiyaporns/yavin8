import { Component, OnInit, ViewChild } from '@angular/core';
import { YavinService } from '../services/yavin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  displayName: string = '';
  constructor(private yavinService: YavinService) {
   }

  ngOnInit(): void {
    this.getProfile();
  }
  
  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  getProfile() {
    this.yavinService.getMeApi().subscribe((res: any) => {
      console.log(res);
      this.displayName = res.display_name;
      // display_name
     }, error => console.log(error));
  }
  
  logout() {
    console.log('in');
    // this.yavinService.logout().subscribe((res: any) => {
      // this.checkLogin = false;
    //  }, error => console.log(error));
  }
}
  

