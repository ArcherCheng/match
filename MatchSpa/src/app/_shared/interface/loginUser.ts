export interface LoginUser {
  userId: number;
  userName: string;
  mainPhotoUrl: string;
}

export interface ForgetPassword {
  phone: string;
  email: string;
  birthYear: number;
}

export interface ChangePassword {
  phone: string;
  email: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
