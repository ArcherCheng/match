import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_shared/interface/user';
import { Pagination, PaginatedResult } from 'src/app/_shared/interface/pagination';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { AuthService } from 'src/app/_shared/service/auth.service';
import { UserService } from 'src/app/_shared/service/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-my-likers',
  templateUrl: './my-likers.component.html',
  styleUrls: ['./my-likers.component.css']
})
export class MyLikersComponent implements OnInit {
  userList: User[];
  pagination: Pagination;

  constructor(
    private alertify: AlertifyService,
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: {apiResult: PaginatedResult<User[]>}) => {
      this.userList = data.apiResult.result;
      this.pagination = data.apiResult.pagination;
      // console.log(data.apiResult);
    } );
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadPageData();
  }

  loadPageData() {
    this.userService.getMyLikerList(+this.authService.decodedToken.nameid, this.pagination.currentPage,
      this.pagination.itemsPerPage).subscribe(
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
    }

    this.alertify.confirm('確定要加入我的最愛嗎?', () => {
      this.userService.addMyLiker(this.authService.decodedToken.nameid, likerId).subscribe(() => {
        this.alertify.success('加入成功');
      }, error => {
        this.alertify.error('加入失敗:' + error);
      });
    });
  }

  deleteMyLiker(likerId: number) {
    if (!this.authService.isLogin()) {
      this.alertify.warning('請先登入系統');
      this.router.navigate(['/auth/login']);
      return;
    }

    this.alertify.confirm('確定要移出我的最愛嗎?', () => {
      this.userService.deleteMyLiker(this.authService.decodedToken.nameid, likerId).subscribe(() => {
        this.userList.splice(this.userList.findIndex(p => p.userId === likerId), 1);
        this.alertify.success('移出成功');
      }, error => {
        this.alertify.error('移出失敗:' + error);
      });
    });
  }
}
