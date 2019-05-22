import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { LoginUser, ForgetPassword, ChangePassword } from '../interface/loginUser';
import { HttpClient } from '@angular/common/http';
import { CheckboxItem } from '../interface/checkbox-item';
import { Register } from '../interface/register';
import { UserCondition } from '../interface/user-condition';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl + 'auth/';
  private jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: LoginUser;
  private mainPhotoUrl = new BehaviorSubject<string>('../../assets/imgs/user.png');
  currentPhotoUrl = this.mainPhotoUrl.asObservable();
  private condition: UserCondition;
  private isSidemenOpen = true;
  private sideMenuToggle: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isSidemenOpen);
  isSideMenuToggle = this.sideMenuToggle.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  register(user: Register) {
    // console.log(user);
    return this.http.post(this.baseUrl + 'register', user);
  }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const res = response;
        if (res) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
          this.currentUser = res.user;
          this.decodedToken = this.jwtHelper.decodeToken(res.token);
          this.changeUserPhoto(this.currentUser.mainPhotoUrl);
        }
      })
    );
  }

  forgetPassword(model: ForgetPassword ) {
    return this.http.post(this.baseUrl + 'forgetPassword', model);
  }

  changePassword(model: ChangePassword ) {
    return this.http.post(this.baseUrl + 'changePassword', model);
  }

  logout() {
    this.decodedToken = null;
    this.currentUser = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isLogin(): boolean {
    const token = localStorage.getItem('token');
    const isTokenExpired = this.jwtHelper.isTokenExpired(token);
    // if (this.decodedToken === undefined && isTokenExpired === false) {
    //   this.decodedToken = this.jwtHelper.decodeToken(token);
    //   const user = localStorage.getItem('user');
    //   this.currentUser = JSON.parse(user);
    //   this.changeUserPhoto(this.currentUser.mainPhotoUrl);
    // }
    return !isTokenExpired;
  }

  changeUserPhoto(photoUrl: string) {
    this.mainPhotoUrl.next(photoUrl);
  }

  getCheckboxItemList(keyGroup: string): Observable<CheckboxItem[]> {
    return this.http.get<CheckboxItem[]>(this.baseUrl + 'getCheckboxItemList/' + keyGroup);
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // this.router.navigate(['/home']);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  setUserCondition(data: UserCondition) {
    this.condition = data;
    localStorage.setItem('condition', JSON.stringify(data));
  }

  getUserCondition(): UserCondition {
    if (this.condition) {
      return this.condition;
    }
    const storage = localStorage.getItem('condition');
    this.condition = JSON.parse(storage);
    return this.condition;
  }

  get XisSideMenuToggle() {
    return this.sideMenuToggle.asObservable();
  }

  doSideMenuToggle() {
    this.isSidemenOpen = !this.isSidemenOpen;
    this.sideMenuToggle.next(this.isSidemenOpen);
  }


}
