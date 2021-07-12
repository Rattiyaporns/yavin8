import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';
import { isPlatformServer } from '@angular/common';

@Injectable()
export class UniversalInterceptor implements HttpInterceptor {
  constructor(@Optional() @Inject(REQUEST) protected request: Request, @Inject(PLATFORM_ID) protected platformId: Object) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const isServer = isPlatformServer(this.platformId);
    let serverReq: HttpRequest<any> = req;
    if (this.request && req.url.indexOf('http') !== 0 && isServer) {
      let newUrl = `${this.request.protocol}://${this.request.get('host')}`;
      if (!req.url.startsWith('/')) {
        newUrl += '/';
      }
      newUrl += req.url;
      serverReq = req.clone({ url: newUrl });
    }

    return next.handle(serverReq);
  }
}