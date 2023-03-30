type Message = {
  text: string;
  createdAt: admin.firestore.Timestamp;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
};

type ResponseMessage = {
  text: string[];
  createdAt: admin.firestore.Timestamp;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
}

type Option = {
  value: string;
  label: string;
};

type Data = {
  modelOptions: Option[];
};
