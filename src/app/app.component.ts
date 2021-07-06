import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  metaData= {
    name: 'Angular Universal',
    description: 'Angualr Universal Testing',
    image: 'avatar.png'
  };
  constructor(private title: Title, private meta: Meta) {
    

    // this.meta.updateTag([
    //   { property: 'og:title', content: 'test' },
    //   { property: 'og:url', 'www.domain.com/page' },
    //   {}
    // ]);
    // this.meta.addTag({ property: 'og:title', content: 'pageTitle' });
    // this.meta.addTag({ property: 'og:url', content: 'https://yavin-test.azurewebsites.net/' });
    // this.meta.updateTag({ property: 'og:url', 'https://yavin-test.azurewebsites.net/' });
    // this.meta.updateTag({ property: 'og:image', content: coverUrl, itemprop: 'image' });
    // this.meta.updateTag({ property: 'og:title', content: pageTitle });
    // this.meta.updateTag({ property: 'og:title', content: pageTitle });
    // const viewport = this.meta.getTag('name=viewport');
    // if (viewport) console.log(viewport.content);

   }

  ngOnInit(): void {
    this.title.setTitle(this.metaData.name);
    this.meta.addTags([
      { name: 'og:type', content: 'article' },
      { name: 'og:url', content: '/about' },
      { name: 'og:title', content: 'test' },
      { name: 'og:image', content: 'https://http.cat/404' }
      // { name: 'og:description', content: this.metaData.description},
      // { name: 'og:image', content: this.metaData.image }
    ]);
  }

}
