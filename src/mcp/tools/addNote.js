import * as z from 'zod/v4';
import { apiRequest } from '../../services/apiClient.js'

export default {
    name: 'add-note',
    title: 'Add a note',
    description: 'Save user\'s note.',
    inputSchema: {
        note: z.string().describe("Note to add")
    },
    execute: async ({ note }, context) => {

        const authInfo = context.http?.authInfo;

        if (!authInfo?.token) {
            return {
                isError: true,
                content: [{ type: 'text', text: 'Unauthorized access.' }]
            };
        }

        try {
            const res = await apiRequest({
                endpoint: 'add-note',
                method: 'POST',
                token: authInfo.token,
                data: { note }
            });

            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify(res)
                    }
                ]
            };
        } catch (error) {
            return {
                isError: true,
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify(error.message)
                    }
                ]
            };
        }
    }
};