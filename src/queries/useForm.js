import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import { request } from '../utils';

function useForm(
    { id, processDefinitionKey },
    options = {}
) {
  return useQuery({
    ...options,
    queryKey: [ 'form', id, processDefinitionKey ],
    queryFn: async () => {
      const { response, error } = await request(
        api.getForm({ id, processDefinitionKey })
      );

      if (response !== null) {
        return response.json();
      }

      if (error) {
        throw error;
      }

      new Error('Could not fetch form');
    },
    initialData: {
      schema: null
    }
  });
}

export { useForm };
