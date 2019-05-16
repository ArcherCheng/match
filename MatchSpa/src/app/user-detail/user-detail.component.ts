import { Component, OnInit } from '@angular/core';
import { UserService } from '../_shared/service/user.service';
import { AlertifyService } from '../_shared/service/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../_shared/interface/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: {apiResult: User} ) => { this.user = data.apiResult; } );
  }

}
