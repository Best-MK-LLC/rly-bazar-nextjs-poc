import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

const fetchMetaAccount = async () => {
  const { data } = await http.get(API_ENDPOINTS.META_LOGIN);
  return {
    data: data,
  };
};

const loginQuery = () => {
  return useQuery([API_ENDPOINTS.META_LOGIN], fetchMetaAccount);
};

export { loginQuery, fetchMetaAccount };
