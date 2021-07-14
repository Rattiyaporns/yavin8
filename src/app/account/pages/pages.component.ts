import { Component, OnInit } from '@angular/core';
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
export class PagesComponent implements OnInit {

  public readonly url = environment.urlMetaTags;

  id: any;
  constructor(
    private yavinService: YavinService,
    private route: ActivatedRoute,
    private title: Title,
    private seoService: SeoService) { }

  async ngOnInit(): Promise<any> {
    this.title.setTitle('Wiseday');

    this.id = this.route.snapshot.params['id'];
    const page = await this.yavinService.getPageApi(this.id).toPromise();
    this.updateMetaTags(page);
  }

  updateMetaTags(page: any) {
    const follower = this.seoService.intToString(page.stat.follower_count);
    const title = `${page.display_name} (${follower} Followers)`;
    this.seoService.updateTitle(title);

    const url = this.url + 'pages/' + this.id;
    this.seoService.updateUrl(url);

    this.seoService.updateType('page');
    this.seoService.updateImageUrl(this.seoService.getDefault(page.avatar_url));
    this.seoService.updateDescription(page.about);
  }

}
