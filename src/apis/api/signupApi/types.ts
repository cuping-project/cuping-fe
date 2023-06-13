interface IUsers {
  userId: string;
  nickname: string;
  password: string;
}

interface IOwner {
  userId: string;
  nickname: string;
  password: string;
  storeName: string;
  storeAddress: string;
  storeNumber: string;
  authImage: any;
}

type UserId = {
  userId: string;
};

export type { IUsers, IOwner, UserId };
