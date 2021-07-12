import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class SeoService {
    constructor(private title: Title, private meta: Meta) {
    }
    
    public updateType(content: string) {
        this.meta.updateTag({ property: 'og:type', content: content })
        this.meta.updateTag({ property: 'twitter:card', content: content })
    }
    
    public updateTitle(content: string) {
        this.meta.updateTag({ property: 'og:title', content: content })
        this.meta.updateTag({ property: 'twitter:title', content: content })
    }

    public updateUrl(content: string) {
        this.meta.updateTag({ property: 'og:url', content: content })
        this.meta.updateTag({ property: 'twitter:url', content: content })
    }

    public updateImageUrl(content: string) {
        this.meta.updateTag({ property: 'og:image', content: content })
        this.meta.updateTag({ property: 'twitter:image', content: content })
    }

    public updateDescription(content: string) {
        this.meta.updateTag({ property: 'og:description', content: content })
        this.meta.updateTag({ property: 'twitter:description', content: content })
    }
}


