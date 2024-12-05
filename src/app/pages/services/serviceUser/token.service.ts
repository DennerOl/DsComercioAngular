import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

const KEY = 'token';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  salvarToken(token: string) {
    return localStorage.setItem(KEY, token);
  }

  excluirToken() {
    localStorage.removeItem(KEY);
  }

  retornarToken() {
    return localStorage.getItem(KEY) ?? '';
  }

  possuiToken() {
    return !!this.retornarToken();
  }
}
