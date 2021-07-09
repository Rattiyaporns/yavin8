import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { YavinService } from './services/yavin.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  metaData= {
    title: 'test',
    description: '',
    image: '',
    type: '',
    url: '',
  };
  constructor(private title: Title, private meta: Meta, private service: YavinService) {
   }

  ngOnInit(): void {
    // console.log(this.metaData);
    this.getUser();
    this.setMetaDataFacebook(this.metaData);
  }

  getUser() {
    this.service.getUserApi().subscribe((res: any) => {
      console.log('res', res);
      this.metaData.title = res.display_name + res.stat.follower_count;
      this.metaData.image = res.avatar_url;
      this.metaData.type = 'profile';
      this.metaData.description = res.about;
      this.title.setTitle('Wiseday');  
      console.log('metaData', this.metaData);    
      this.setMetaDataFacebook(this.metaData);
    }, error => console.log('error', error)); 
    // this.setMetaTwitter(this.metaData);
  }

  setMetaDataFacebook(metaData: any) {
    console.log(metaData);
    this.meta.addTags([
      { name: 'og:type', content: metaData.type },
      // { name: 'og:url', content: metaData.url },
      { name: 'og:image', content: metaData.image },
      { name: 'og:description', content: metaData.description},
      { name: 'og:title', content: metaData.title}
    ]);
  }

  // setMetaTwitter(metaData: any) {
  //     this.meta.addTag({name: 'description', content: metaData.description});
  //     this.meta.addTag({name: 'twitter:card', content: 'summary'});
  //     this.meta.addTag({name: 'twitter:title', content: metaData.title});
  //     this.meta.addTag({name: 'twitter:description', content: metaData.description});
  //     this.meta.addTag({name: 'twitter:text:description', content: metaData.description});
  //     this.meta.addTag({name: 'twitter:image', content:  metaData.image});
  // }

}
