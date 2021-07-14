import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { YavinService } from 'src/app/services/yavin.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {

  privacyTitle: string = '';
  privacyContent: string = '';
  
  constructor(private title: Title, 
    private yavinService: YavinService)
  { }

  async ngOnInit(): Promise<any> {
    this.title.setTitle('Policy Privacy - Wiseday');

    var privacy = await this.yavinService.getPolicyPrivacy()
      .toPromise();
    
    this.privacyTitle = privacy.title;
    this.privacyContent = privacy.content;
  }
}
