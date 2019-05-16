import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_shared/service/auth.service';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { UserService } from 'src/app/_shared/service/user.service';
import { UserCondition } from '../_shared/interface/user-condition';
import { CheckboxItem } from '../_shared/interface/checkbox-item';

@Component({
  selector: 'app-user-match-condition',
  templateUrl: './user-match-condition.component.html',
  styleUrls: ['./user-match-condition.component.css']
})
export class UserMatchConditionComponent implements OnInit {
  userCondition: UserCondition;
  myFormGroup: FormGroup;

  // bloodList = BloodList;
  bloodOptions = new Array<CheckboxItem>();
  bloodSelected = new Array();

  starOptions =  new Array<CheckboxItem>();
  starSelected = new Array();

  religionOptions = new Array<CheckboxItem>();
  religionSelected = new Array();

  cityOptions = new Array<CheckboxItem>();
  citySelected = new Array();

  jobOptions = new Array<CheckboxItem>();
  jobSelected = new Array();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private alertify: AlertifyService,
    private userService: UserService,
  ) {
  }

  ngOnInit() {
    console.log('ngOnInit');
    this.route.data.subscribe((data: { apiResult: UserCondition }) => {
      this.userCondition = data.apiResult;
      this.setSelectedValue();
      this.createFormGroup();
    });
  }

  setSelectedValue() {
    // console.log('setCheckboxOptions');
    this.authService.getCheckboxItemList('Blood').subscribe(data => this.bloodOptions = data);
    if (this.userCondition.bloodInclude !== null) {
      this.bloodSelected = this.userCondition.bloodInclude.split(',');
    }

    this.authService.getCheckboxItemList('Star').subscribe(data => this.starOptions = data);
    if (this.userCondition.starInclude) {
      this.starSelected = this.userCondition.starInclude.split(',');
    }

    this.authService.getCheckboxItemList('Job').subscribe(data => this.jobOptions = data);
    if (this.userCondition.jobTypeInclude) {
      this.jobSelected = this.userCondition.jobTypeInclude.split(',');
    }

    this.authService.getCheckboxItemList('City').subscribe(data => this.cityOptions = data);
    if (this.userCondition.cityInclude) {
      this.citySelected = this.userCondition.cityInclude.split(',');
    }

    this.authService.getCheckboxItemList('Religion').subscribe(data => this.religionOptions = data);
    if (this.userCondition.religionInclude) {
      this.religionSelected = this.userCondition.religionInclude.split(',');
    }

  }

  createFormGroup() {
      // console.log('createFormGroup');
      this.myFormGroup = this.fb.group({
        userId: [this.userCondition.userId],
        sex: [this.userCondition.sex],
        marryMin: [this.userCondition.marryMin, Validators.required],
        marryMax: [this.userCondition.marryMax, Validators.required],
        yearMin: [this.userCondition.yearMin, Validators.required],
        yearMax: [this.userCondition.yearMax, Validators.required],
        educationMin: [this.userCondition.educationMin, Validators.required],
        educationMax: [this.userCondition.educationMax, Validators.required],
        heightsMin: [this.userCondition.heightsMin, Validators.required],
        heightsMax: [this.userCondition.heightsMax, Validators.required],
        weightsMin: [this.userCondition.weightsMin, Validators.required],
        weightsMax: [this.userCondition.weightsMax, Validators.required],
        salaryMin: [this.userCondition.salaryMin, Validators.required],
        bloodInclude: [this.userCondition.bloodInclude],
        starInclude: [this.userCondition.starInclude],
        cityInclude: [this.userCondition.cityInclude],
        jobTypeInclude: [this.userCondition.jobTypeInclude],
        religionInclude: [this.userCondition.bloodInclude],
      });
  }

  onSubmit() {
    if (this.authService.isLogin()) {
      const userId = +this.authService.decodedToken.nameid;
      // debugger;
      this.userService.updateUserCondition(userId, this.myFormGroup.value).subscribe(next => {
        this.router.navigate(['userMatchList', userId]);
      }, error => {
        this.alertify.error(error.error);
      });
    } else {
      // save to localstorage
      this.authService.setUserCondition(this.myFormGroup.value);
      this.router.navigate(['userMatchList/0']);
    }
  }

  PushValue(check, item) {
    let orgItem = this.userCondition.starInclude.split(',');
    const haveItem = orgItem.includes(item);
    console.log(check, item);
    if (check) {
      if (!haveItem) {
        orgItem.push(item);
      }
    } else {
      if (haveItem) {
        orgItem = orgItem.filter((ele) => {
          return ele !== item;
        });
      }
    }
    // tslint:disable-next-line:no-string-literal
    // this.checkbocValObj['starInclue'] = orgItem;
    // this.checkBoxService.postValue(this.checkbocValObj);
    // console.log(this.checkbocValObj);

  }

  onBloodChenges(value) {
    this.myFormGroup.controls.bloodInclude.setValue(value.join(','));
  }

  onStarChenges(value) {
    this.myFormGroup.controls.starInclude.setValue(value.join(','));
  }

  onCityChenges(value) {
    this.myFormGroup.controls.cityInclude.setValue(value.join(','));
  }

  onJobChenges(value) {
    this.myFormGroup.controls.jobTypeInclude.setValue(value.join(','));
  }

  onReligionChenges(value) {
    this.myFormGroup.controls.religionInclude.setValue(value.join(','));
  }
}
