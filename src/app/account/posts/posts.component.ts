import { isPlatformServer } from '@angular/common';
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

  id: any;
  constructor(
    private yavinService: YavinService,
    private route: ActivatedRoute,
    private title: Title,
    private seoService: SeoService) { }

    async ngOnInit(): Promise<any> {
      this.title.setTitle('Wiseday');
  
      this.id = this.route.snapshot.params['id'];
      console.log(this.id);
      const post = await this.yavinService.getPostApi(this.id).toPromise();
      this.updateMetaTags(post);
    }

    getPostDescription(post: any): string {
      if (Array.isArray(post.contents) && post.contents.length) {
        return post.contents[0].caption;
      }

      if (post.live != null) {
        return post.description;
      }

      return '';
    }
  
    updateMetaTags(post: any) {
      const title = post.owner.display_name;
      this.seoService.updateTitle(title);
  
      const url = this.url + 'posts/' + this.id;
      this.seoService.updateUrl(url);
  
      this.seoService.updateType('post');
      this.seoService.updateImageUrl(post.owner.avatar_url ?? '');

      const description = this.getPostDescription(post);
      console.log(description);
      this.seoService.updateDescription(description);
    }
}
