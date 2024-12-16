import React from 'react'
import { useState } from 'react'
const ChatList = () => {
	const [addMode, setAddMode] = useState(false)
	return (
		<div className='flex-1 overflow-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-[#131e33ab] scrollbar-track-transparent'>{/* Chatlist */}
			<div className='flex items-center gap-5 p-5'>{/* Search */}
				<div className='bg-[#11192880] flex items-center gap-5 p-[10px] rounded-[10px]'>{/* SearchBar */}
					<img className='w-5 h-5' src="./search.png" alt="search" />
					<input className='bg-transparent outline-none border-none text-white w-full' type="text" placeholder='Search' />
				</div>
				<img className='w-9 h-9 bg-[#111b2d80] p-[10px] rounded-[10px] cursor-pointer' src={addMode ? "./minus.png" : "./plus.png"} alt="plus"
					onClick={() => setAddMode((prev) => !prev)} />
			</div>

			<div className='flex items-center gap-5 p-5 cursor-pointer border-b border-solid border-custom-gray'>{/*Item*/}
				<img className='w-[50px] h-[50px] rounded-full object-cover' src="./avatar.png" alt="avatar" />
				<div className='flex flex-col gap-[10px]'>{/*Texts*/}
					<span className='font-medium'>Jane Doe</span>
					<p className='text-sm font-light'>Hello</p>
				</div>
			</div>
			<div className='flex items-center gap-5 p-5 cursor-pointer border-b border-solid border-custom-gray'>{/*Item*/}
				<img className='w-[50px] h-[50px] rounded-full object-cover' src="./avatar.png" alt="avatar" />
				<div className='flex flex-col gap-[10px]'>{/*Texts*/}
					<span className='font-medium'>Jane Doe</span>
					<p className='text-sm font-light'>Hello</p>
				</div>
			</div>
			<div className='flex items-center gap-5 p-5 cursor-pointer border-b border-solid border-custom-gray'>{/*Item*/}
				<img className='w-[50px] h-[50px] rounded-full object-cover' src="./avatar.png" alt="avatar" />
				<div className='flex flex-col gap-[10px]'>{/*Texts*/}
					<span className='font-medium'>Jane Doe</span>
					<p className='text-sm font-light'>Hello</p>
				</div>
			</div>
			<div className='flex items-center gap-5 p-5 cursor-pointer border-b border-solid border-custom-gray'>{/*Item*/}
				<img className='w-[50px] h-[50px] rounded-full object-cover' src="./avatar.png" alt="avatar" />
				<div className='flex flex-col gap-[10px]'>{/*Texts*/}
					<span className='font-medium'>Jane Doe</span>
					<p className='text-sm font-light'>Hello</p>
				</div>
			</div>
		</div>
	)
}

export default ChatList