import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
import { PaginatedResult } from '../interface/pagination';
import { UserCondition } from '../interface/user-condition';
import { UserPhoto } from '../interface/user-photo';
import { AuthService } from './auth.service';
import { UserMessage } from '../interface/user-message';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getUserList(page?, itemsPerPage?): Observable<PaginatedResult<User[]>> {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http.get<User[]>(this.baseUrl + 'home/userList', { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      );
  }

  getUserMatchList(page?, itemsPerPage?): Observable<PaginatedResult<User[]>> {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (this.authService.isLogin()) {
      const userId = +this.authService.decodedToken.nameid;
      return this.http.get<User[]>(this.baseUrl + 'home/userMatchList/' + userId , { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          console.log('getUserMatchList');
          console.log(paginatedResult);

          return paginatedResult;
        })
      );
    } else {
      const condition = this.authService.getUserCondition();
      return this.http.post<User[]>(this.baseUrl + 'home/userMatchList', condition, { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      );
    }
  }

  getUserDetail(userId: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'home/userDetail/' + userId);
  }

  getUserPhotos(userId: number): Observable<UserPhoto[]> {
    return this.http.get<UserPhoto[]>(this.baseUrl + 'home/userPhotos/' + userId);
  }

  getUserCondition(userId: number): Observable<UserCondition> {
    return this.http.get<UserCondition>(this.baseUrl + 'home/userCondition/' + userId );
  }

  updateUserCondition(userId: number, data: UserCondition ) {
    return this.http.post(this.baseUrl + 'home/userCondition/update/' + userId , data);
  }

  // 以下為須登入才能使用的功能
  getMyDetail(userId: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'member/' + userId + '/editMember');
  }

  updateMyData(userId: number, data: User ) {
    return this.http.post(this.baseUrl + 'member/' + userId + '/updateMember' , data);
  }

  setMainPhoto(userId: number, id: number) {
    return this.http.post(this.baseUrl + 'member/' + userId + '/setMainPhoto/' + id , {});
  }

  deletePhoto(userId: number, id: number) {
    return this.http.delete(this.baseUrl + 'member/' + userId + '/delPhoto/' + id );
  }

  addLiker(userId: number, likeId: number) {
    return this.http.post(this.baseUrl + 'member/' + userId + '/addLiker/' + likeId, {});
  }

  getMyLikerList(userId: number, page?, itemsPerPage?): Observable<PaginatedResult<User[]>> {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null ) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http.get<User[]>(this.baseUrl + 'member/' + userId + '/myLikerPageList', {observe: 'response', params} )
    .pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
  }

  getAllMessages(userId: number, page?, itemsPerPage?, messageContainer?) {
    const paginatedResult: PaginatedResult<UserMessage[]> = new PaginatedResult<UserMessage[]>();

    let params = new HttpParams();
    params = params.append('messageContainer', messageContainer);
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<UserMessage[]>(this.baseUrl + 'member/' + userId + '/getAllMessages', {observe: 'response', params})
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') !== null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }

          return paginatedResult;
        })
      );
  }

  getMessageThread(userId: number, recipientId: number) {
    return this.http.get<UserMessage[]>(this.baseUrl + 'member/' + userId + '/threadMessage/' + recipientId);
  }

  sendMessage(userId: number, messape: UserMessage) {
    return this.http.post(this.baseUrl + 'member/' + userId + '/createMessage', messape);
  }

  deleteMessage(userId: number, messageId: number ) {
    return this.http.post(this.baseUrl + 'member/' + userId + '/deleteMessage/' + messageId, {});
  }

  markAsRead(userId: number, messageId: number) {
    return this.http.post(this.baseUrl + 'member/' + userId + '/markRead/' + messageId , {}).subscribe();
  }

  getMsgNotifications(userId: number): Observable<UserMessage[]> {
    return this.http.get<UserMessage[]>(this.baseUrl + 'member/' + userId + '/getUnreadMessages');
  }


}
