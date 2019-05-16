import { Component, OnInit } from '@angular/core';
import { UserMessage } from 'src/app/_shared/interface/user-message';
import { Pagination, PaginatedResult } from 'src/app/_shared/interface/pagination';
import { AuthService } from 'src/app/_shared/service/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { UserService } from 'src/app/_shared/service/user.service';

@Component({
  selector: 'app-my-messages',
  templateUrl: './my-messages.component.html',
  styleUrls: ['./my-messages.component.css']
})
export class MyMessagesComponent implements OnInit {
  messages: UserMessage[] = [];
  pagination: Pagination;
  messageContainer = 'Unread';
  messageContainer2 = 'AAA Unread';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: {apiResult: PaginatedResult<UserMessage[]>}) => {
      this.messages = data.apiResult.result;
      this.pagination = data.apiResult.pagination;
    });
  }

  loadMessages(messageContainer) {
    this.userService.getAllMessages(this.authService.decodedToken.nameid, this.pagination.currentPage,
        this.pagination.itemsPerPage, messageContainer)
          .subscribe((res: PaginatedResult<UserMessage[]>) => {
            this.messages = res.result;
            this.pagination = res.pagination;
            this.messageContainer = messageContainer;
            window.scrollTo(0, 0);
        }, error => {
          this.alertify.error(error);
        });
  }


  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages(this.messageContainer);
  }


  deleteMessage(id: number) {
    this.alertify.confirm('您確定要刪除此留言嗎?', () => {
      this.userService.deleteMessage(this.authService.decodedToken.nameid, id).subscribe(() => {
        this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
        this.alertify.success('留言刪除成功');
      }, error => {
        this.alertify.error(error);
      });
    });
  }

}
