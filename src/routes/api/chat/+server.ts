import { createOpenAI } from '@ai-sdk/openai';
import { streamText, tool, type Message } from 'ai';
import { z } from 'zod';

import { OPENAI_API_KEY } from '$env/static/private';

const openai = createOpenAI({
	apiKey: OPENAI_API_KEY
});

export async function POST({ request }) {
	const { messages }: { messages: Message[] } = await request.json();

	const result = streamText({
		model: openai('gpt-4o-mini'),
		messages,
		tools: {
			metresToFeet: tool({
				description: 'Convert metres to feet',
				parameters: z.object({
					metres: z.number().describe('The value in metres')
				}),
				execute: async ({ metres }) => {
					const feet = metres * 3.28084;

					return {
						metres,
						feet
					};
				}
			})
		},
		maxSteps: 5
	});

	return result.toDataStreamResponse();
}
