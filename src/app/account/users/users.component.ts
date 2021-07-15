import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { YavinService } from 'src/app/services/yavin.service';
import { SeoService } from 'src/app/services/seo.service';
import { DOCUMENT } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {
  id: any;
  constructor(
    private yavinService: YavinService,
    private route: ActivatedRoute,
    private title: Title,
    private seoService: SeoService,
    @Inject(DOCUMENT) private document: Document) { }

  async ngOnInit(): Promise<any> {
    this.title.setTitle('Wiseday');

    this.id = this.route.snapshot.params['id'];
    const user = await this.yavinService.getUserApi(this.id).toPromise();
    this.updateMetaTags(user);
  }

  ngAfterViewInit(): void {
    const url = `wiseday://users/${this.id}`;
    this.document.location.href = url;
  }

  updateMetaTags(user: any) {
    const follower = this.seoService.intToString(user.stat.follower_count);
    const title = `${user.display_name} (${follower} Followers)`;
    
    this.seoService.updateTitle(title);
    this.seoService.updateType('profile');
    this.seoService.updateImageUrl(this.seoService.getDefault(user.avatar_url));
    this.seoService.updateDescription(user.about ?? '');
  }

}
