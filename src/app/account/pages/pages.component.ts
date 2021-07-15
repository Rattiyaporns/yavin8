import { DOCUMENT } from '@angular/common';
import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from 'src/app/services/seo.service';
import { YavinService } from 'src/app/services/yavin.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit, AfterViewInit {

  // public readonly url = environment.urlMetaTags;

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
    const page = await this.yavinService.getPageApi(this.id).toPromise();
    this.updateMetaTags(page);
  }

  ngAfterViewInit(): void {
    const url = `wiseday://pages/${this.id}`;
    this.document.location.href = url;
  }

  updateMetaTags(page: any) {
    const follower = this.seoService.intToString(page.stat.follower_count);
    const title = `${page.display_name} (${follower} Followers)`;
    this.seoService.updateTitle(title);

    this.seoService.updateType('page');
    this.seoService.updateImageUrl(this.seoService.getDefault(page.avatar_url));
    this.seoService.updateDescription(page.about);
  }

}
