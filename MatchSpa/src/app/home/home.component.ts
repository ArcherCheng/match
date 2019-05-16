import { Component, OnInit } from '@angular/core';
import { Pagination, PaginatedResult } from '../_shared/interface/pagination';
import { User } from '../_shared/interface/user';
import { AlertifyService } from '../_shared/service/alertify.service';
import { AuthService } from '../_shared/service/auth.service';
import { UserService } from '../_shared/service/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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
    this.userService.getUserList(this.pagination.currentPage, this.pagination.itemsPerPage).subscribe(
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
