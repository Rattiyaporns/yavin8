import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from 'src/app/services/seo.service';
import { YavinService } from 'src/app/services/yavin.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

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
    const group = await this.yavinService.getGroupApi(this.id).toPromise();
    this.updateMetaTags(group);
  }

  updateMetaTags(group: any) {
    const follower = this.seoService.intToString(group.stat.member_count);
    const title = `${group.display_name} (${follower} Followers)`;
    this.seoService.updateTitle(title);

    const url = this.url + 'groups/' + this.id;
    this.seoService.updateUrl(url);

    this.seoService.updateType('group');
    this.seoService.updateImageUrl(this.seoService.getDefault(group.avatar_url));
    this.seoService.updateDescription(group.about);
  }

}
