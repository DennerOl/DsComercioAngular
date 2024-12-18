import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenService } from './token.service';
import { PessoaUsuaria } from '../types/credentials&user';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<PessoaUsuaria | null>(null);
  private apiUrl: string = environment.API;

  constructor(private tokenService: TokenService, private http: HttpClient) {
    if (this.tokenService.possuiToken()) {
      this.decodificarJWT();
    }
  }

  private decodificarJWT() {
    const token = this.tokenService.retornarToken();
    const user = jwtDecode(token) as PessoaUsuaria;
    this.userSubject.next(user);
  }

  retornarUser() {
    return this.userSubject.asObservable();
  }

  salvarToken(token: string) {
    this.tokenService.salvarToken(token);
    this.decodificarJWT();
  }

  logout() {
    this.tokenService.excluirToken();
    this.userSubject.next(null);
  }

  estaLogado() {
    return this.tokenService.possuiToken();
  }

  cadastraUser(user: PessoaUsuaria): Observable<PessoaUsuaria> {
    const headers = this.createAuthHeaders();
    return this.http.post<PessoaUsuaria>(`${this.apiUrl}/users`, user, {
      headers: headers,
    });
  }

  buscarCadastro(): Observable<PessoaUsuaria> {
    const token = this.tokenService.retornarToken();
    const headers = this.createAuthHeaders().set(
      'Authorization',
      `Bearer ${token}`
    );

    return this.http.get<PessoaUsuaria>(`${this.apiUrl}/users/me`, { headers });
  }

  editarCadastro(pessoaUsuaria: PessoaUsuaria): Observable<PessoaUsuaria> {
    const token = this.tokenService.retornarToken();
    const headers = this.createAuthHeaders().set(
      'Authorization',
      `Bearer ${token}`
    );
    return this.http.patch<PessoaUsuaria>(
      `${this.apiUrl}/users/perfil`,
      pessoaUsuaria,
      { headers }
    );
  }

  deleteUser(email: string): Observable<PessoaUsuaria> {
    const token = this.tokenService.retornarToken();

    const headers = this.createAuthHeaders().set(
      'Authorization',
      `Bearer ${token}`
    );
    return this.http.delete<PessoaUsuaria>(`${this.apiUrl}/users/${email}`, {
      headers: headers,
    });
  }

  private createAuthHeaders(): HttpHeaders {
    const token = this.tokenService.retornarToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }
}
