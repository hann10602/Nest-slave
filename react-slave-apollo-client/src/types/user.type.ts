export type UserType = {
  id: number;
  username: string;
  displayName: string;
  settings?: UserSettingsType;
};

export type UserSettingsType = {
  userId: number;
  receiveEmail: boolean;
  receiveNotification: boolean;
};
