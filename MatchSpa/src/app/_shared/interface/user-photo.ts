export interface UserPhoto {
  id: number;
  userId: number;
  photoUrl: string;
  descriptions: string;
  dateAdded: Date;
  isMain: boolean;
}
