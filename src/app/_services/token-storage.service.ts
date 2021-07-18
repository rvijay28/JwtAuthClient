import { Injectable } from '@angular/core';

const AUTH_TOKEN_KEY = "authToken";
const REFRESH_TOKEN_KEY = "refreshToken";

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private sessionStorage = window.sessionStorage;
  constructor() {
    this.removeTokens();
  }

  public saveAuthToken(authToken: string) {
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
    sessionStorage.setItem(AUTH_TOKEN_KEY, authToken);
  }

  public saveRefreshToken(refreshToken: string) {
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }

  public getAuthToken(): string {
    return sessionStorage.getItem(AUTH_TOKEN_KEY);
  }

  public getRefreshToken(): string {
    return sessionStorage.getItem(REFRESH_TOKEN_KEY);
  }

  public removeTokens(): void {
    this.sessionStorage.removeItem(AUTH_TOKEN_KEY);
    this.sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  }
}
