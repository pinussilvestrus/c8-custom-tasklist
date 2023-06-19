import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import { request } from '../utils/request';

function useTasks(body) {
  return useQuery({
    queryKey: [ 'currentUser' ],
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
