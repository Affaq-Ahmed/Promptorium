'use client';

import { useEffect, useState } from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
	return (
		<div className='mt-16 prompt_layout'>
			{data.map((prompt) => (
				<PromptCard
					key={prompt.id}
					prompt={prompt}
					handleTagClick={handleTagClick}
				/>
			))}
		</div>
	);
};

const Feed = () => {
	const [posts, setPosts] = useState([]);
	const [searchText, setSearchText] = useState('');
	const [searchedPosts, setSearchedPosts] = useState([]);
	const [searchTimeout, setSearchTimeout] = useState(null);

	const handleTagClick = (tag) => {
		setSearchText(tag);

		const filteredPosts = filterPrompts(tag);
		setSearchedPosts(filteredPosts);
	};

	const fetchPosts = async () => {
		const response = await fetch('/api/prompt');
		const data = await response.json();

		setPosts(data);
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	const filterPrompts = (searchText) => {
		const regex = new RegExp(searchText, 'i');

		return posts.filter((prompt) => {
			return (
				regex.test(prompt.prompt) ||
				regex.test(prompt.creator.username) ||
				regex.test(prompt.tag)
			);
		});
	};

	const handleSearchChange = (e) => {
		const searchText = e.target.value;

		setSearchText(searchText);

		if (searchTimeout) {
			clearTimeout(searchTimeout);
		}

		const timeout = setTimeout(() => {
			const filteredPosts = filterPrompts(searchText);
			setSearchedPosts(filteredPosts);
		}, 500);

		setSearchTimeout(timeout);
	};

	return (
		<section className='feed'>
			<form className='relative w-full flex-center'>
				<input
					type='text'
					placeholder='Search for a tag or a username'
					value={searchText}
					onChange={handleSearchChange}
					required
					className='search_input peer'
				/>
			</form>

			{searchText ? (
				<PromptCardList
					data={searchedPosts}
					handleTagClick={handleTagClick}
				/>
			) : (
				<PromptCardList
					data={posts}
					handleTagClick={handleTagClick}
				/>
			)}
		</section>
	);
};

export default Feed;
