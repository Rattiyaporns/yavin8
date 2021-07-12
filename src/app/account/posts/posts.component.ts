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
      this.title.setTitle('Wiseday');
  
      this.id = this.route.snapshot.params['id'];
      const post = await this.yavinService.getPostApi(this.id).toPromise();
      const description = post.contents[0].caption ?? post.live?.description ?? '';

      console.log(description);
      // this.updateMetaTags(post);
    }
  
    updateMetaTags(post: any) {
      const title = post.owner.display_name;
      this.seoService.updateTitle(title);
  
      const url = this.url + 'posts/' + this.id;
      this.seoService.updateUrl(url);
  
      this.seoService.updateType('post');
      this.seoService.updateImageUrl(post.owner.avatar_url ?? '');
      this.seoService.updateDescription(post.description ?? '');
    }
}
