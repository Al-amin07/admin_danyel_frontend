type User = {
  _id: string;
  name: string;
  email: string;
  profileImage?: string; // optional because first user doesn't have it
};

export type TIndoxMessage = {
  _id: string;
  text: string;
  document?: string; // optional (image/file url)
  isRead: boolean;
  createdAt: string;
  updatedAt?: string;
  __v?: number;

  sender: {
    _id: string;
    email: string;
    name: string;
  };

  receiver: {
    _id: string;
    email: string;
    name: string;
  };
};

export type TMessage = {
  _id: string;
  createdAt: string;
  isRead: boolean;
  text: string;
  user: User;
};
