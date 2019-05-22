import { Component, OnInit, Input } from '@angular/core';
import { User } from '../interface/user';
import { AlertifyService } from '../service/alertify.service';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  @Input() user: User;

  constructor(
    private alertify: AlertifyService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
    ) { }

  ngOnInit() {
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
    }

    this.alertify.confirm('確定要移出我的最愛嗎?', () => {
      this.userService.deleteMyLiker(this.authService.decodedToken.nameid, likerId).subscribe(() => {
        this.alertify.success('移出成功');
      }, error => {
        this.alertify.error('移出失敗:' + error);
      });
    });
  }

}
