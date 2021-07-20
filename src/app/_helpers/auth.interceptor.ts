import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TokenStorageService } from "../_services/token-storage.service";

const TOKEN_HEADER_KEY = 'Authorization';
const TOKEN_PREFIX = 'Bearer ';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenStorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if (req.headers.get('skip-interceptor')) {
        req = req.clone({
          headers: req.headers.delete('skip-interceptor')
        });
        return next.handle(req);
      }
      let authReq = req;
      let authToken = this.tokenService.getAuthToken();
      console.log("received token: " + authToken);
      if (authToken) {
        authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY,
          TOKEN_PREFIX + authToken) });
      }
      return next.handle(authReq);
  }
}
