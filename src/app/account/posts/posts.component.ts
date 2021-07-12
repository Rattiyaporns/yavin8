import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from 'src/app/services/seo.service';
import { YavinService } from 'src/app/services/yavin.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  public readonly url = environment.urlMetaTags;
  metaData = {
    title: '',
    description: '',
    image: '',
    type: '',
    url: '',
  };

  id: any;
  constructor(
    private yavinService: YavinService,
    private route: ActivatedRoute,
    private title: Title,
    private seoService: SeoService) { }

  async ngOnInit(): Promise<any> {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.title.setTitle('Wiseday');
    });
    var response = await this.yavinService.getUserApi(this.id).toPromise();
    this.metaData.title = response.display_name + response.stat.follower_count;
    this.metaData.url = this.url + 'posts/' + this.id;
    this.metaData.image = response.avatar_url;
    this.metaData.type = 'post';
    this.metaData.description = response.about;
    this.setSocialTags(this.metaData);
  }

  setSocialTags(metaData: any) {
    this.seoService.updateType(metaData.type);
    this.seoService.updateTitle(metaData.title);
    this.seoService.updateUrl(metaData.url);
    this.seoService.updateImageUrl(metaData.image);
    this.seoService.updateDescription(metaData.description);
  }

}
