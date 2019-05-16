import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_shared/interface/user';
import { Pagination, PaginatedResult } from 'src/app/_shared/interface/pagination';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { AuthService } from 'src/app/_shared/service/auth.service';
import { UserService } from 'src/app/_shared/service/user.service';
import { ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute
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

}
