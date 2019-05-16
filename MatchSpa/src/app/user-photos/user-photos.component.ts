import { Component, OnInit } from '@angular/core';
import { UserPhoto } from '../_shared/interface/user-photo';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../_shared/service/user.service';
import { AlertifyService } from '../_shared/service/alertify.service';

@Component({
  selector: 'app-user-photos',
  templateUrl: './user-photos.component.html',
  styleUrls: ['./user-photos.component.css']
})
export class UserPhotosComponent implements OnInit {
  userPhotos: UserPhoto[];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: {apiResult: UserPhoto[]} ) => this.userPhotos = data.apiResult);
  }

}
