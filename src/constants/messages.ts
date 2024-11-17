export interface IMessages {
  message: string;
  createdAt: string;
  type: string;
  creator: "you" | "friend";
}

export interface IMessageRoot {
  [key: string]: IMessages[];
}

export const messages: IMessageRoot = {
  nargiza: [
      {
        type: "message",
        creator: "you",
        message: "Salom",
        createdAt: "2024-11-06T08:56:27.900+00:00",
      },
      {
        type: "message",
        creator: "you",
        message: "Bugun havo qanday?",
        createdAt: "2024-11-06T19:56:59.900+00:00",
      },
      {
        type: "message",
        creator: "you",
        message: "Nimalar bilan bandsiz",
        createdAt: "2024-11-06T15:03:46.900+00:00",
      },
      {
        type: "message",
        creator: "friend",
        message: "Salom yaxshimisiz?",
        createdAt: "2024-11-06T08:57:02.900+00:00",
      },
      {
        type: "message",
        creator: "friend",
        message: "Nimalar bilan bandsiz",
        createdAt: "2024-11-06T15:04:55.900+00:00",
      },
      {
        type: "message",
        creator: "friend",
        message: "Tinchlik o'zizdachi 😊",
        createdAt: "2024-11-06T19:57:19.900+00:00",
      },
  ],
};
