import {Request, Response} from 'express';

const data = [
  {
    id: '100',
    resourceLocator: 'iam://users/110/principal',
    owner: null,
    name: 'students',
    createTime: 1609207571000,
    isSignatureCreatable: true,
    isSignatureUsable: true,
    isSessionCreatable: true,
    isSessionUsable: true,
  },
  {
    id: '113',
    resourceLocator: 'iam://users/113/principal',
    owner: null,
    name: 'parents',
    createTime: 1609207563000,
    isSignatureCreatable: true,
    isSignatureUsable: true,
    isSessionCreatable: true,
    isSessionUsable: true,
  },
  {
    id: '119',
    resourceLocator: 'iam://users/119/principal',
    owner: null,
    name: 'teachers',
    createTime: 1609207567000,
    isSignatureCreatable: false,
    isSignatureUsable: false,
    isSessionCreatable: true,
    isSessionUsable: true,
  },
];

const packedData = {
  total: 3,
  success: true,
  pageSize: 20,
  current: 1,
  data
}

const getPrincipalGroups = (req: Request, res: Response) => {
  res.json(packedData);
};

export default {
  'GET /api/principals/principal-groups': getPrincipalGroups,
};
