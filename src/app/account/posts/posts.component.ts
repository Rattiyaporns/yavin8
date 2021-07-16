import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { SeoService } from 'src/app/services/seo.service';
import { YavinService } from 'src/app/services/yavin.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, AfterViewInit {
  id: any;
  constructor(
    private yavinService: YavinService,
    private route: ActivatedRoute,
    private title: Title,
    private seoService: SeoService,
    @Inject(DOCUMENT) private document: Document,
    private deviceService: DeviceDetectorService) { }

  async ngOnInit(): Promise<any> {
    this.title.setTitle('Wiseday');

    this.id = this.route.snapshot.params['id'];
    const post = await this.yavinService.getPostApi(this.id).toPromise();
    this.updateMetaTags(post);
  }

  ngAfterViewInit(): void {
    if (!this.deviceService.isDesktop()) {
      const url = `wiseday://posts/${this.id}`;
      this.document.location.href = url;
    }
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
    const title = `[${post.owner.display_name}] ${post.contents[0].caption}`;
    this.seoService.updateTitle(title);

    this.seoService.updateType('post');

    const description = this.getPostDescription(post);
    this.seoService.updateDescription(description);
    const image = this.getImage(post);
    this.seoService.updateImageUrl(image);
  }

  getImage(post: any) {
    let image;
    if (post.contents[0].media) {
      const media = post.contents[0].media[0];
      const type = media.type;
      if (type === 'image') {
        image = media.media_url;
      } else if (type === 'video') {
        image = media.thumbnail_url;
      } else {
        image = this.seoService.getDefault(post.owner.avatar_url, 'post');
      }
    } else {
      image = this.seoService.getDefault(post.owner.avatar_url, 'post');
    }
    return image;
  }
}
