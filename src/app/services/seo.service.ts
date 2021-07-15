import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class SeoService {
    constructor(private title: Title, private meta: Meta) {
    }

    public updateType(content: string) {
        this.meta.updateTag({ property: 'og:type', content: content });
        this.meta.updateTag({ property: 'twitter:card', content: content });
    }

    public updateTitle(content: string) {
        this.meta.updateTag({ property: 'og:title', content: content });
        this.meta.updateTag({ property: 'twitter:title', content: content });
    }

    public updateUrl(content: string) {
        this.meta.updateTag({ property: 'og:url', content: content });
        this.meta.updateTag({ property: 'twitter:url', content: content });
    }

    public updateImageUrl(content: string) {
        this.meta.updateTag({ property: 'og:image', content: content });
        this.meta.updateTag({ property: 'twitter:image', content: content });
    }

    public updateDescription(content: string) {
        if (content) {
            this.meta.updateTag({ property: 'og:description', content: content });
            this.meta.updateTag({ property: 'twitter:description', content: content });
        }
    }

    public getDefault(image: any, type?: any) {
        let imgUrl: any;
        let defaultImage;
        if (type && type === 'post') {
            defaultImage = 'https://d2qcrcf01ey77p.cloudfront.net/Public/meta/default_avatar_md.png';
        } else {
            defaultImage = 'https://d2qcrcf01ey77p.cloudfront.net/Public/meta/default_avatar_sm.png';
        }
        imgUrl = (!image) ? defaultImage : image;
        return imgUrl;
    }

    public intToString(value: any) {
        let shortValue;
        var suffixes = ["", "K", "M", "B", "T"];
        var suffixNum = Math.floor((value.toString()).length / 3);
        shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000, suffixNum)) : value).toPrecision(2));
        if (shortValue % 1 != 0) {
            shortValue = shortValue.toFixed(1);
        }
        return `${shortValue}${suffixes[suffixNum]}`;
    }
}


