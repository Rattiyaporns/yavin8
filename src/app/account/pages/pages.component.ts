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
      console.log(page);
      // this.updateMetaTags(page);
    }
  
    updateMetaTags(page: any) {
      const title = page.owner.display_name;
      this.seoService.updateTitle(title);
  
      const url = this.url + 'pages/' + this.id;
      this.seoService.updateUrl(url);
  
      this.seoService.updateType('page');
      this.seoService.updateImageUrl(page.owner.avatar_url ?? '');
      this.seoService.updateDescription(page.description ?? '');
    }

}
