import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserPhoto } from 'src/app/_shared/interface/user-photo';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/_shared/service/user.service';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { AuthService } from 'src/app/_shared/service/auth.service';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-photos',
  templateUrl: './my-photos.component.html',
  styleUrls: ['./my-photos.component.css']
})
export class MyPhotosComponent implements OnInit {
  baseUrl = environment.apiUrl;
  photos: UserPhoto[];
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;
  currentMain: UserPhoto;
  // @Output() getUserMainPhotoChange = new EventEmitter<string>();

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private alertify: AlertifyService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: {apiResult: UserPhoto[]} ) => this.photos = data.apiResult);
    this.initializeUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'member/' + this.authService.decodedToken.nameid + '/uploadPhotos',
      method: 'POST',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });
    this.uploader.onAfterAddingFile = ((file) => {file.withCredentials = false; });

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: UserPhoto = JSON.parse(response);
        const photo = {
          id: res.id,
          photoUrl: res.photoUrl,
          dateAdded: res.dateAdded,
          descriptions: res.descriptions,
          isMain: res.isMain
        };
        this.photos.push(photo);
      }
    };
  }


  setMainPhoto(photo: UserPhoto)  {
    this.userService.setMainPhoto(this.authService.decodedToken.nameid, photo.id).subscribe(() => {
      // this.alertify.success('封面設定成功');
      this.currentMain = this.photos.filter(p => p.isMain === true)[0];
      this.currentMain.isMain = false;
      photo.isMain = true;
      // this.getUserMainPhotoChange.emit(photo.photoUrl);
      this.authService.changeUserPhoto(photo.photoUrl);
      console.log(this.authService.currentUser);
      // this.authService.currentUser.mainPhotoUrl = photo.photoUrl;
      // localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
    }, error => {
      this.alertify.error(error);
    });
  }

  deletePhoto(id: number) {
    this.alertify.confirm('確定要刪除嗎?', () => {
      this.userService.deletePhoto(this.authService.decodedToken.nameid, id).subscribe(() => {
        this.photos.splice(this.photos.findIndex(p => p.id === id), 1);
        this.alertify.success('刪除成功');
      }, error => {
        this.alertify.error(error);
      });
    });
  }

}
