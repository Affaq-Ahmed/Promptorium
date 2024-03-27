'use client';

import Profile from '@components/Profile';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const UserProfile = ({ params }) => {
	const searchParams = useSearchParams();
	const username = searchParams.get('name');

	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(`/api/users/${params?.id}/posts`);
			const data = await response.json();

			setPosts(data);
		};

		console.log(params?.id);
		if (params?.id) fetchPosts();
	}, [params.id]);

	return (
		<Profile
			name={username + `'s`}
			desc={`Welcome to ${username}'s personalized profile page. Explore ${username}'s prompts below and get inspired!`}
			data={posts}
		/>
	);
};

export default UserProfile;
