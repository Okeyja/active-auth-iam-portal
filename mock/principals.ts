import {Request, Response} from 'express';

const data = [
  {
    id: '1',
    key: '1',
    resourceLocator: 'iam://users/1/principal',
    owner: null,
    name: 'ponyma',
    createTime: 1609207567000,
    canUseSignature: true,
    canUseToken: true,
  },
  {
    id: '2',
    key: '2',
    resourceLocator: 'iam://users/2/principal',
    owner: null,
    name: 'jackma',
    createTime: 1609207571000,
    canUseSignature: true,
    canUseToken: true,
  },
  {
    id: '3',
    key: '3',
    resourceLocator: 'iam://users/3/principal',
    owner: null,
    name: 'robinlee',
    createTime: 1609207563000,
    canUseSignature: true,
    canUseToken: true,
  },
  {
    id: '4',
    key: '4',
    resourceLocator: 'iam://users/4/principal',
    owner: 'iam://users/1/principal',
    name: 'qinshihuang',
    createTime: 1609208704017,
    canUseSignature: true,
    canUseToken: true,
  },
  {
    id: '5',
    key: '5',
    resourceLocator: 'iam://users/5/principal',
    owner: 'iam://users/2/principal',
    name: 'napoleon',
    createTime: 1609208707000,
    canUseSignature: true,
    canUseToken: true,
  },
];

const packedData = {
  total: 5,
  success: true,
  pageSize: 20,
  current: 1,
  data
}

const getPrincipals = (req: Request, res: Response) => {
  res.json(packedData);
};

export default {
  'GET /api/principals': getPrincipals,
};
