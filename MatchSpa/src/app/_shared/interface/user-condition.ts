export interface UserCondition {
  userId: number;
  sex: number;

  marryMin: number;
  marryMax: number;

  yearMin: number;
  yearMax: number;

  educationMin: number;
  educationMax: number;

  heightsMin: number;
  heightsMax: number;

  weightsMin: number;
  weightsMax: number;

  salaryMin: number;

  bloodInclude: string;

  starInclude: string;

  cityInclude: string;

  jobTypeInclude: string;

  religionInclude: string;
}
