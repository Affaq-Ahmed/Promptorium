import { Prompt } from '@models/prompt';
import { connectToDB } from '@utils/database';

export const POST = async (req) => {
	const { prompt, tag, userId } = await req.json();

	if (!prompt || !tag || !userId) {
		console.log(
			'Please fill in all fields.',
			{ prompt },
			{ tag },
			{ userId }
		);
		return new Response(
			JSON.stringify({ message: 'Please fill in all fields.' }),
			{
				status: 400,
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
	}

	try {
		await connectToDB();

		const newPrompt = new Prompt({
			creator: userId,
			prompt,
			tag,
		});

		await newPrompt.save();

		return new Response(JSON.stringify(newPrompt), {
			status: 201,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	} catch (error) {
		console.log(error);
		return new Response(
			JSON.stringify({ message: 'Failed to create the prompt.' }),
			{
				status: 500,
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
	}
};
