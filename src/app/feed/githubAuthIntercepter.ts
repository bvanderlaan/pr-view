import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpHeaders,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs/Rx';

import { RemoteHost, RemoteHostListService } from '../remotehost';

@Injectable()
export class GithubAPIInterceptor implements HttpInterceptor {
  constructor(private remoteHostListService: RemoteHostListService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const remoteHosts = this.remoteHostListService.get();
    if (!remoteHosts.length) return next.handle(req);

    const { url, username, token } = remoteHosts[0];

    if (req.url.includes(url)) {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization',`Basic ${btoa(`${username}:${token}`)}`);

      return next.handle(req.clone({ headers }));
    }

    return next.handle(req);
  }
}
