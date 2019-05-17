import { Component, OnInit } from '@angular/core';
import { UserMessage } from 'src/app/_shared/interface/user-message';
import { UserService } from 'src/app/_shared/service/user.service';
import { AuthService } from 'src/app/_shared/service/auth.service';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-my-messages-thread',
  templateUrl: './my-messages-thread.component.html',
  styleUrls: ['./my-messages-thread.component.css']
})
export class MyMessagesThreadComponent implements OnInit {
  recipientId: number;
  messages: UserMessage[];
  newMessage: any = {};

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.recipientId = this.route.snapshot.params.recipientId;
    // this.userService.getMessageThread(this.authService.decodedToken.nameid, this.recipientId)
    //   .subscribe(data => this.messages = data);

    // this.route.data.subscribe((data: {apiResult: UserMessage[]}) => {
    //   this.messages = data.apiResult;
    //   this.recipientId = this.route.snapshot.params.recipientId;
    // });
    this.loadMessage();
  }

  loadMessage() {
    const currentUserId = +this.authService.decodedToken.nameid;
    this.userService.getMessageThread(this.authService.decodedToken.nameid, this.recipientId)
    .pipe(
      tap(message => {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < message.length; i++) {
          if (message[i].isRead === false && message[i].recipientId === currentUserId) {
            this.userService.markAsRead(currentUserId, message[i].id);
          }
        }
      })
    ).subscribe(messages => {
      this.messages = messages;
    }, error => {
      this.alertify.error(error);
    });
  }

  sendMessage() {
    this.newMessage.recipientId = this.recipientId;
    this.userService.sendMessage(this.authService.decodedToken.nameid, this.newMessage)
    .subscribe((message: UserMessage) => {
      this.messages.unshift(message);
      this.newMessage.contents = '';
    }, error => {
      this.alertify.error(error);
    });
  }


}
