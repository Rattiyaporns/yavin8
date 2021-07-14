import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { YavinService } from 'src/app/services/yavin.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {
  termTitle: string = '';
  termContent: string = '';
  
  constructor(private title: Title, 
    private yavinService: YavinService)
  { }

  async ngOnInit(): Promise<any> {
    this.title.setTitle('Term of Use - Wiseday');

    var term = await this.yavinService.getTermOfUse()
      .toPromise();
    
    this.termTitle = term.title;
    this.termContent = term.content;
  }
}
