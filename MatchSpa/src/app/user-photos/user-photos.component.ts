import { Component, OnInit } from '@angular/core';
import { UserPhoto } from '../_shared/interface/user-photo';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../_shared/service/user.service';
import { AlertifyService } from '../_shared/service/alertify.service';
import { User } from '../_shared/interface/user';
import { AuthService } from '../_shared/service/auth.service';

@Component({
  selector: 'app-user-photos',
  templateUrl: './user-photos.component.html',
  styleUrls: ['./user-photos.component.css']
})
export class UserPhotosComponent implements OnInit {
  userPhotos: UserPhoto[];
  userId: number;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private alertify: AlertifyService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: {apiResult: UserPhoto[]} ) => this.userPhotos = data.apiResult);
    if (this.userPhotos.length > 0)  {
      this.userId = this.userPhotos[0].userId;
    }
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
