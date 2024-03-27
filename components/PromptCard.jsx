'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';

const PromptCard = ({
	prompt,
	handleTagClick,
	handleEdit,
	handleDelete,
}) => {
	const { data: session } = useSession();
	const pathName = usePathname();
	const router = useRouter();
	const [copied, setCopied] = useState('');

	const handleCopy = () => {
		setCopied(prompt.prompt);

		navigator.clipboard.writeText(prompt.prompt);
		setTimeout(() => setCopied(''), 3000);
	};

	return (
		<div className='prompt_card'>
			<div className='flex justify-between items-start gap-5'>
				<div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
					<Image
						src={prompt.creator.image}
						width={40}
						height={40}
						alt='user_img'
						className='rounded-full object-contain'
					/>
					<div className='flex flex-col'>
						<h3 className='font-satoshi font-semibold text-gray-900'>
							{prompt.creator.username}
						</h3>
						<p className='font-inter text-sm text-gray-500'>
							{prompt.creator.email}
						</p>
					</div>
				</div>
				<div className='copy_btn' onClick={handleCopy}>
					<Image
						src={
							copied === prompt.prompt
								? 'assets/icons/tick.svg'
								: 'assets/icons/copy.svg'
						}
						alt='copy'
						width={12}
						height={12}
					/>
				</div>
			</div>

			<p className='my-4 font-satoshi text-sm text-gray-700'>
				{prompt.prompt}
			</p>
			<p
				className='font-inter text-sm blue_gradient cursor-pointer'
				onClick={() => handleTagClick && handleTagClick(post.tag)}
			>
				#{prompt.tag}
			</p>

			{session?.user.id === prompt.creator._id &&
				pathName === '/profile' && (
					<div className='mt-5 flex-center gap-5 border-t border-gray-200 pt-3'>
						<p
							className='font-inter text-sm green_gradient cursor-pointer'
							onClick={() => handleEdit(prompt)}
						>
							Edit
						</p>
						<p
							className='font-inter text-sm orange_gradient cursor-pointer'
							onClick={() => handleDelete(prompt)}
						>
							Delete
						</p>
					</div>
				)}
		</div>
	);
};

export default PromptCard;
