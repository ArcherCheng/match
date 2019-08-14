import { Component, OnInit } from '@angular/core';
import { UserService } from '../_shared/service/user.service';
import { AlertifyService } from '../_shared/service/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../_shared/interface/user';
import { AuthService } from '../_shared/service/auth.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: {apiResult: User} ) => { this.user = data.apiResult; } );
  }

  addMyLiker(likerId: number) {
    if (!this.authService.isLogin()) {
      this.alertify.warning('請先登入系統');
      this.router.navigate(['/auth/login']);
      return;
    }

    this.alertify.confirm('確定要加入我的好友嗎?', () => {
      this.userService.addMyLiker(this.authService.decodedToken.nameid, likerId).subscribe(() => {
        this.alertify.success('加入成功');
      }, error => {
        this.alertify.error('加入失敗:' + error);
      });
    });
  }

}
