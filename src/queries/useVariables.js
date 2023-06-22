import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import { request } from '../utils/request';


function useVariables(
    { taskId },
    options = {}
) {
  return useQuery({
    ...options,
    queryKey: [ 'variables', taskId ],
    queryFn: async () => {
      const { response, error } = await request(
        api.searchVariables({ taskId }),
      );

      if (response !== null) {
        return response.json();
      }

      if (error) {
        throw error;
      }

      new Error('Could not fetch variables');
    }
  });
}

export { useVariables };
