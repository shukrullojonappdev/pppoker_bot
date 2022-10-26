export interface IUser {
  username: string;
  fullname: string;
  phoneNumber: string;
  pppokerId: string;
  usdTexId: string;
  chips?: number;
  roles?: [string];
}
