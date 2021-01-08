import request from 'umi-request';
import type {TableListParams} from './data.d';


export async function queryPrincipal(params?: TableListParams) {
  return request('/api/principals', {
    params,
  });
}

export async function querySubprincipal(params?: TableListParams) {
  return request('/api/principals', {
    params,
  });
}

export async function queryPrincipalGroup(params?: TableListParams) {
  return request('/api/principals/principal-groups', {
    params,
  });
}

export async function queryAppDomain(params?: TableListParams) {
  return request('/api/principals/app-domains', {
    params,
  });
}

export async function removeRule(params: { key: number[] }) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
