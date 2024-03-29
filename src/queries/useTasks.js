import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import { request } from '../utils';

const POLLING_INTERVAL = 2000;


function useTasks(body) {
  return useQuery({
    queryKey: [ 'currentUser' ],
    refetchInterval: POLLING_INTERVAL,
    queryFn: async () => {
      const { response, error } = await request(api.searchTasks(body));

      if (response !== null) {
        return response.json();
      }

      if (error) {
        throw error;
      }

      new Error('Could not fetch tasks');
    }
  });
}

export { useTasks };
