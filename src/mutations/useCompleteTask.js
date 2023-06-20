import { useMutation } from '@tanstack/react-query';
import { api } from '../api';
import { request } from '../utils/request';

function useCompleteTask() {
  return useMutation({
    mutationFn: async (payload) => {
      const { response, error } = await request(api.completeTask(payload));

      if (response !== null) {
        return response.json();
      }

      if (error) {
        throw error;
      }

      new Error('Could not complete task');
    },
  });
}

export { useCompleteTask };
