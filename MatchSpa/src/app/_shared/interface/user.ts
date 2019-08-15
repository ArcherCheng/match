export interface User {
  userId: number;
  nickName: string;
  phone: string;
  email: string;
  birthYear: number;

  sex: number;
  marry: number;
  education: number;
  heights: number;
  weights: number;
  salary: number;

  blood: string;
  star: string;
  city: string;
  jobType: string;
  religion: string;

  // school: string;
  // subjects: string;
  isCloseData: boolean;
  isClosePhoto: boolean;

  mainPhotoUrl: string;
  loginDate: Date;
  activeDate: Date;

  introduction: string;
  likeCondition: string;
}

