'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

const CreatePrompt = () => {
	const [submitting, setSubmitting] = useState(false);
	const [post, setPost] = useState({
		prompt: '',
		tag: '',
	});

	const createPrompt = async (e) => {
		e.preventDefault();

		setSubmitting(true);

		try {
			const response = await fetch('/api/prompt', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					prompt: post.prompt,
					tag: post.tag,
					userId: session?.user.id,
				}),
			});

			if (!response.ok) {
				throw new Error('An error occurred. Please try again.');
			}

			router.push('/');
		} catch (error) {
			console.log(error);
			alert('An error occurred. Please try again.');
		} finally {
      setSubmitting(false);
    }
	};

	return (
		<Form
			type='Create'
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={createPrompt}
		/>
	);
};

export default CreatePrompt;
