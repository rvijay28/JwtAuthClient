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
      console.info("Inside intercept");
      let authReq = req;
      let authToken = this.tokenService.getAuthToken();
      console.log("received token: " + authToken);
      if (authToken) {
        authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY,
          TOKEN_PREFIX + authToken) });
      }
      console.log(authReq.headers.get(TOKEN_HEADER_KEY));
      return next.handle(authReq);
  }
}
