import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { YavinService } from 'src/app/services/yavin.service';
import { SeoService } from 'src/app/services/seo.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  url = 'https://yavin-test.azurewebsites.net/';
  id: any;
  constructor(
    private yavinService: YavinService,
    private route: ActivatedRoute,
    private title: Title,
    private seoService: SeoService) { }

  async ngOnInit(): Promise<any> {
    this.title.setTitle('Wiseday');

    this.id = this.route.snapshot.params['id'];
    var user = await this.yavinService.getUserApi(this.id).toPromise();

    this.updateMetaTags(user);
  }

  updateMetaTags(user: any) { 
    const title = `${user.display_name} (${user.stat.follower_count} Followers)`;
    this.seoService.updateTitle(title);

    const url = this.url + 'users/' + this.id;
    this.seoService.updateUrl(url);

    this.seoService.updateType('profile');
    this.seoService.updateImageUrl(this.getDefault(user.avatar_url));
    this.seoService.updateDescription(user.description ?? '');
  }

  getDefault(image: any) {
    const imgUrl = (!image)? 'https://ookbee-yavin.s3.ap-southeast-1.amazonaws.com/Public/meta/Red.jpg': image;
    return imgUrl;
  }
}
