import { IMessage } from '@/typings/typings';

export const DUMMY_MESSAGES: IMessage[] = [
  {
    _id: '1',
    content: 'hello',
    sameAuthor: false,
    author: {
      username: 'tomas',
      _id: '1',
    },
    date: '22/01/2022',
    sameDay: false,
  },
  {
    _id: '2',
    content: 'hello once again',
    sameAuthor: true,
    author: {
      username: 'tomas',
      _id: '1',
    },
    date: '22/01/2022',
    sameDay: true,
  },
  {
    _id: '3',
    content: 'hello third time',
    sameAuthor: true,
    author: {
      username: 'tomas',
      _id: '1',
    },
    date: '23/01/2022',
    sameDay: false,
  },
  {
    _id: '4',
    content: 'hello response first time',
    sameAuthor: false,
    author: {
      username: 'pelusa',
      _id: '2',
    },
    date: '23/01/2022',
    sameDay: true,
  },
  {
    _id: '5',
    content: 'hello response third time',
    sameAuthor: true,
    author: {
      username: 'pelusa',
      _id: '2',
    },
    date: '24/01/2022',
    sameDay: false,
  },
  {
    _id: '11',
    content: 'hello',
    sameAuthor: false,
    author: {
      username: 'tomas',
      _id: '1',
    },
    date: '22/01/2022',
    sameDay: false,
  },
  {
    _id: '12',
    content: 'hello once again',
    sameAuthor: true,
    author: {
      username: 'tomas',
      _id: '1',
    },
    date: '22/01/2022',
    sameDay: true,
  },
  {
    _id: '13',
    content: 'hello third time',
    sameAuthor: true,
    author: {
      username: 'tomas',
      _id: '1',
    },
    date: '23/01/2022',
    sameDay: false,
  },
  {
    _id: '14',
    content: 'hello response first time',
    sameAuthor: false,
    author: {
      username: 'pelusa',
      _id: '2',
    },
    date: '23/01/2022',
    sameDay: true,
  },
  {
    _id: '15',
    content: 'hello response third time',
    sameAuthor: true,
    author: {
      username: 'pelusa',
      _id: '2',
    },
    date: '24/01/2022',
    sameDay: false,
  },
  {
    _id: '21',
    content: 'hello',
    sameAuthor: false,
    author: {
      username: 'tomas',
      _id: '1',
    },
    date: '22/01/2022',
    sameDay: false,
  },
  {
    _id: '22',
    content: 'hello once again',
    sameAuthor: true,
    author: {
      username: 'tomas',
      _id: '1',
    },
    date: '22/01/2022',
    sameDay: true,
  },
  {
    _id: '23',
    content: 'hello third time',
    sameAuthor: true,
    author: {
      username: 'tomas',
      _id: '1',
    },
    date: '23/01/2022',
    sameDay: false,
  },
  {
    _id: '24',
    content: 'hello response first time',
    sameAuthor: false,
    author: {
      username: 'pelusa',
      _id: '2',
    },
    date: '23/01/2022',
    sameDay: true,
  },
  {
    _id: '25',
    content: 'hello response third time',
    sameAuthor: true,
    author: {
      username: 'pelusa',
      _id: '2',
    },
    date: '24/01/2022',
    sameDay: false,
  },
];
