import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import {
  CLIENT_ID,
  CLIENT_SECRET,
  environment,
} from 'src/environments/environment.development';
import { UserService } from './user.service';

interface AuthResponse {
  access_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiUrl: string = environment.API;

  constructor(private http: HttpClient, private userService: UserService) {}

  autenticar(
    email: string,
    senha: string
  ): Observable<HttpResponse<AuthResponse>> {
    const headers = this.createHeaders();
    const body = this.createBody(email, senha);

    return this.http
      .post<AuthResponse>(`${this.apiUrl}/oauth2/token`, body.toString(), {
        headers,
        observe: 'response',
      })
      .pipe(
        tap((response) => {
          const authToken = response.body?.access_token || '';
          this.userService.salvarToken(authToken);
        })
      );
  }

  private createHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${btoa(CLIENT_ID + ':' + CLIENT_SECRET)}`,
    });
  }

  private createBody(email: string, senha: string): string {
    return new HttpParams()
      .set('username', email)
      .set('password', senha)
      .set('grant_type', 'password')
      .toString();
  }
}
