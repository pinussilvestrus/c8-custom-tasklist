import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api';
import { request } from '../utils';

function useAssignTask() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async ({ taskId, assignee }) => {
      const { response, error } = await request(api.assignTask(taskId, { assignee }));

      if (response !== null) {
        return response.json();
      }

      if (error) {
        throw error;
      }

      new Error('Could not assign task');
    },
    onSettled: async (newTask, error) => {
      if (error !== null || newTask === undefined) {
        return;
      }

      await client.cancelQueries({ queryKey: [ 'task', newTask.id ] });
      client.setQueryData(
        [ 'task', newTask.id ],
        (cachedTask) => {
          if (cachedTask === undefined) {
            return cachedTask;
          }

          return {
            ...newTask,
            formKey: cachedTask.formKey,
          };
        }
      );
    }
  });
}

export { useAssignTask };
