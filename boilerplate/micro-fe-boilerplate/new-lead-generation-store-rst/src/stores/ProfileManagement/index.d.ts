interface IUserProfile {
  username: string;
  fullname: string;
  phone: string;
}

export interface IProfileManagement {
  activeUser: IUserProfile | null;
  initiated: boolean;
}
