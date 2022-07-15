import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, tap } from 'rxjs';
import { Fatture } from 'src/app/components/homepage/sidebar/crea-fatture/fatture-Interface';
import { ILogin } from './interfacce/i-login';
import { IUserToken } from './interfacce/i-user-token';
import { IUsers } from './interfacce/i-users';


@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private linkserver = 'http://localhost:3000';
  authSubject = new BehaviorSubject<IUserToken | null>(null);
  users: IUsers[] = [];
  error: undefined;
  helper = new JwtHelperService();




  constructor(private http: HttpClient, private router: Router) {
    this.restoreUserLogin();
  }

  login(obj: ILogin) {
    return this.http.post<IUserToken>(this.linkserver + '/login', obj).pipe(
      tap((data) => {
        this.authSubject.next(data);
        localStorage.setItem('Utente', JSON.stringify(data));
      })
    );
  }

  logout() {
    localStorage.removeItem('Utente');
    this.authSubject.next(null);
    this.router.navigate(['/Login']);
  }

  /* clienti e dipendenti */
  registrazione(obj: IUsers) {
    return this.http.post(this.linkserver + '/register', obj);
  }

  getClienti() {
    return this.http.get<IUserToken>(this.linkserver + '/users');
  }

  /* fatture */
  addFatture(obj: Fatture) {
    return this.http.post<Fatture>(this.linkserver + '/fatture', obj);
  }
  restoreUserLogin() {
    const json = localStorage.getItem('Utente');
    if (json) {
      const user = JSON.parse(json);
      if (this.helper.isTokenExpired(user.accessToken)) {
        localStorage.removeItem('Utente');
        return
      } else {
        this.authSubject.next(user);
      }
    }
  }
  delFatture(id: number) {
    return this.http.delete(this.linkserver + '/fatture/' + id)
  }
  delUt(id: number, at: string) {
    return this.http.delete<IUsers[]>(this.linkserver + '/users/' + id, {
      headers: new HttpHeaders({ "Authorization": "Bearer " + at })
    })
  }
  patchUt(obj: IUsers, at: string, id: number) {
    return this.http.patch<IUsers[]>(this.linkserver + '/users/' + id, obj, {
      headers: new HttpHeaders({ "Authorization": "Bearer " + at })
    })
  }
  patchFt(obj: IUsers, at: string, id: number) {
    return this.http.patch<Fatture[]>(this.linkserver + '/fatture/' + id, obj, {
      headers: new HttpHeaders({ "Authorization": "Bearer " + at })
    })
  }
}

