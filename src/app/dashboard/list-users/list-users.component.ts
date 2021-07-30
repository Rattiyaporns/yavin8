import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { YavinService } from 'src/app/services/yavin.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  displayedColumns: string[] = ['displayname', 'username', 'email', 'createdate', 'editdate', 'isactive'];
  dataSource: any;
  cheackedData = false;
  constructor(
    private yavinService: YavinService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.yavinService.getAllUsers().subscribe((resAccount: any) => {
      this.dataSource = new MatTableDataSource<any>(resAccount);
      this.cheackedData = true;
    }, error => {
      console.log(error);
    });
  }

  getProfile(id: any) {
    this.router.navigate(['/dashboard/profile', id], { relativeTo: this.route });    
  }

}
