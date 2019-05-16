import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/_shared/interface/user';
import { AuthService } from 'src/app/_shared/service/auth.service';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { UserService } from 'src/app/_shared/service/user.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckboxItem } from 'src/app/_shared/interface/checkbox-item';

@Component({
  selector: 'app-my-detail',
  templateUrl: './my-detail.component.html',
  styleUrls: ['./my-detail.component.css']
})
export class MyDetailComponent implements OnInit {
  user: User;
  editForm: FormGroup;
  // @ViewChild('editForm') editForm: NgForm;

  yearOptions: number[] = this.addOptionsArray(1950, 2019);
  heightOptions: number[] = this.addOptionsArray(145, 200);
  weightOptions: number[] = this.addOptionsArray(35, 100);

  bloodOptions = new Array<CheckboxItem>();
  starOptions =  new Array<CheckboxItem>();
  religionOptions = new Array<CheckboxItem>();
  cityOptions = new Array<CheckboxItem>();
  jobOptions = new Array<CheckboxItem>();

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private userService: UserService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: {apiResult: User}) => {
      this.user = data.apiResult;
    });
    this.loadCheckBoxItem();
    this.createEditForm();
  }

  createEditForm() {
    this.editForm = this.fb.group({
      userId: [this.user.userId, Validators.required],
      nickName: [this.user.nickName, Validators.required],
      phone: [this.user.phone, Validators.required],
      email: [this.user.email, Validators.required],
      birthYear: [this.user.birthYear, Validators.required],
      sex: [this.user.sex, Validators.required],
      heights: [this.user.heights, Validators.required],
      weights: [this.user.weights, Validators.required],
      salary: [this.user.salary, Validators.required],
      marry: [this.user.marry, Validators.required],
      education: [this.user.education, Validators.required],
      blood: [this.user.blood, Validators.required],
      star: [this.user.star, Validators.required],
      city: [this.user.city, Validators.required],
      jobType: [this.user.jobType, Validators.required],
      religion: [this.user.religion, Validators.required],
      isCloseData: [this.user.isCloseData, Validators.required],
      introduction: [this.user.introduction],
      likeCondition: [this.user.likeCondition],
      mainPhotoUrl: [this.user.mainPhotoUrl],
      loginDate: [this.user.loginDate],
      activeDate: [this.user.activeDate],

    });
  }

  onSubmit() {
    this.userService.updateMyData(this.authService.decodedToken.nameid, this.editForm.value).subscribe(next => {
      this.alertify.success('存檔成功');
    }, error => {
      this.alertify.error(error);
    });
  }

  loadCheckBoxItem() {
    this.authService.getCheckboxItemList('Blood').subscribe(data => this.bloodOptions = data);
    this.authService.getCheckboxItemList('Star').subscribe(data => this.starOptions = data);
    this.authService.getCheckboxItemList('City').subscribe(data => this.cityOptions = data);
    this.authService.getCheckboxItemList('Job').subscribe(data => this.jobOptions = data);
    this.authService.getCheckboxItemList('Religion').subscribe(data => this.religionOptions = data);
  }

  addOptionsArray(start: number, max: number) {
    const arr = [];
    for (let i = start;  i <= max; i++ ) {
      arr.push(i);
    }
    return arr;
  }

}
