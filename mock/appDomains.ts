import {Request, Response} from 'express';

const data = [
  {
    id: '721',
    resourceLocator: 'iam://users/721/principal',
    owner: null,
    name: 'Mobile APP',
    createTime: 1609207567000,
    isSignatureCreatable: false,
    isSignatureUsable: false,
    isSessionCreatable: true,
    isSessionUsable: true,
  },
  {
    id: '722',
    resourceLocator: 'iam://users/722/principal',
    owner: null,
    name: 'Web APP',
    createTime: 1609207571000,
    isSignatureCreatable: true,
    isSignatureUsable: true,
    isSessionCreatable: true,
    isSessionUsable: true,
  }
];

const packedData = {
  total: 2,
  success: true,
  pageSize: 20,
  current: 1,
  data
}

const getAppDomains = (req: Request, res: Response) => {
  res.json(packedData);
};

export default {
  'GET /api/principals/app-domains': getAppDomains,
};
