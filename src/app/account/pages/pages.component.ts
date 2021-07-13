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
    const title = `${page.display_name} (${page.stat.follower_count} Followers)`;
    this.seoService.updateTitle(title);

    const url = this.url + 'pages/' + this.id;
    this.seoService.updateUrl(url);

    this.seoService.updateType('page');
    this.seoService.updateImageUrl(this.getImage(page.categories));
    this.seoService.updateDescription(page.about);
  }

  getImage(categories: any) {
    let image = '';
    if (categories.length < 0) return;
    return image = categories[0].image_url;
  }

}
