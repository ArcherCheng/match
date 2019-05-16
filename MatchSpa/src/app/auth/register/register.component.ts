import { Component, OnInit } from '@angular/core';
import { Register } from 'src/app/_shared/interface/register';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CheckboxItem } from 'src/app/_shared/interface/checkbox-item';
import { AuthService } from 'src/app/_shared/service/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerData: Register;
  registerForm: FormGroup;
  loginModel: any;

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
    private router: Router,
    private alertify: AlertifyService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.loadCheckBoxItem();
    this.createRegisterForm();
  }

  loadCheckBoxItem() {
    this.authService.getCheckboxItemList('Blood').subscribe(data => this.bloodOptions = data);
    console.log(this.bloodOptions);
    this.authService.getCheckboxItemList('Star').subscribe(data => this.starOptions = data);
    this.authService.getCheckboxItemList('City').subscribe(data => this.cityOptions = data);
    this.authService.getCheckboxItemList('Job').subscribe(data => this.jobOptions = data);
    this.authService.getCheckboxItemList('Religion').subscribe(data => this.religionOptions = data);
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      nickName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      birthYear: ['', Validators.required],
      sex: ['', Validators.required],
      heights: ['', Validators.required],
      weights: ['', Validators.required],
      salary: ['', Validators.required],
      marry: ['', Validators.required],
      education: ['', Validators.required],
      blood: ['', Validators.required],
      star: ['', Validators.required],
      city: ['', Validators.required],
      jobType: ['', Validators.required],
      religion: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      passwordConfirm: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(fg: FormGroup) {
    return fg.get('password').value === fg.get('passwordConfirm').value ? null : {mismatch: true};
  }

  register() {
    this.registerData = Object.assign({}, this.registerForm.value);
    // console.log(this.registerData);
    // console.log(this.registerForm.value);
    if (this.registerForm.valid) {
      this.authService.register(this.registerData).subscribe(() => {
        this.alertify.success('註冊成功');
      }, error => {
        this.alertify.error('註冊失敗');
      }, () => {
        this.loginModel = {username: this.registerData.phone, password: this.registerData.password};
        this.authService.login(this.loginModel).subscribe(() => {
          this.router.navigate(['/home']);
        });
      });
    }
  }

  addOptionsArray(start: number, max: number) {
    const arr = [];
    for (let i = start;  i <= max; i++ ) {
      arr.push(i);
    }
    return arr;
  }

}
