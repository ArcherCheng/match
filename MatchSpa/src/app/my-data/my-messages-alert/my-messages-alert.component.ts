import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_shared/service/user.service';
import { UserMessage } from 'src/app/_shared/interface/user-message';
import { AuthService } from 'src/app/_shared/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-messages-alert',
  templateUrl: './my-messages-alert.component.html',
  styleUrls: ['./my-messages-alert.component.css']
})
export class MyMessagesAlertComponent implements OnInit {
  messages: UserMessage[] = [];

  constructor(private userService: UserService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.authService.isLogin()) {
      this.userService.getMsgNotifications(this.authService.decodedToken.nameid).subscribe(data => this.messages = data);
    }
  }

  openMyMessage() {
    this.router.navigate(['/myData/myMessages']);
  }

}
