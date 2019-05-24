import { Component, OnInit } from '@angular/core';
import { Pagination, PaginatedResult } from '../_shared/interface/pagination';
import { User } from '../_shared/interface/user';
import { AlertifyService } from '../_shared/service/alertify.service';
import { AuthService } from '../_shared/service/auth.service';
import { UserService } from '../_shared/service/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-match-list',
  templateUrl: './user-match-list.component.html',
  styleUrls: ['./user-match-list.component.css']
})
export class UserMatchListComponent implements OnInit {
  userList: User[];
  pagination: Pagination;

  constructor(
    private alertify: AlertifyService,
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    console.log('UserMatchListComponent');
  }

  ngOnInit() {
    this.route.data.subscribe((data: {apiResult: PaginatedResult<User[]>}) => {
      this.userList = data.apiResult.result;
      this.pagination = data.apiResult.pagination;
    } );
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadPageData();
  }

  loadPageData() {
    this.userService.getUserMatchList(this.pagination.currentPage, this.pagination.itemsPerPage).subscribe(
      (res: PaginatedResult<User[]>) => {
        this.userList = res.result;
        this.pagination = res.pagination;
        window.scrollTo(0, 0);
      }, error => {
        this.alertify.error(error.error);
      }
    );
  }
  addMyLiker(likerId: number) {
    if (!this.authService.isLogin()) {
      this.alertify.warning('請先登入系統');
      this.router.navigate(['/auth/login']);
      return;
    }

    this.alertify.confirm('確定要加入我的最愛嗎?', () => {
      this.userService.addMyLiker(this.authService.decodedToken.nameid, likerId).subscribe(() => {
        this.alertify.success('加入成功');
      }, error => {
        this.alertify.error('加入失敗:' + error);
      });
    });
  }


}
