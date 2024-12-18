import React from 'react'
import { useState, useRef, useEffect } from 'react'
import EmojiPicker from 'emoji-picker-react'

const Chat = () => {
	const [open, setOpen] = useState(false);
	const [text, setText] = useState('');

	const endRef = useRef(null);

	useEffect(() => {
		endRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [])

	const handleEmoji = e => {
		setText((prev) => prev + e.emoji);
		setOpen(false);
	}

	return (
		<div className='flex-2 flex flex-col h-full border-l border-r border-solid border-custom-gray'>{/* Chat */}
			<div className='flex items-center justify-between p-5 border-b border-solid border-custom-gray'>{/* Top */}
				<div className='flex items-center gap-5'>{/* User */}
					<img className='w-[60px] h-[60px] rounded-full object-cover' src="./avatar.png" alt="avatar" />
					<div className='flex flex-col gap-[5px]'>{/* Texts */}
						<span className='text-lg font-bold'>Jane Doe</span>
						<p className='text-sm font-light text-[#a5a5a5]'>Lorem ipsum dolor sit amet consectetur.</p>
					</div>
				</div>
				<div className='flex gap-5'>{/* Icons */}
					<img className='w-5 h-5' src="./phone.png" alt="phone" />
					<img className='w-5 h-5' src="./video.png" alt="video" />
					<img className='w-5 h-5' src="./info.png" alt="info" />
				</div>
			</div>
			<div className='flex-1 flex flex-col p-5 gap-5 overflow-auto scrollbar-thin scrollbar-thumb-[#131e33ab] scrollbar-track-transparent'>{/* Center */}
				<div className='max-w-[70%] flex gap-5 items-end ml-auto'>{/* Messages Owner */}
					<div className='flex flex-1 flex-col gap-[5px]'>{/* Texts */}
						<p className='p-5 bg-[#5183FE] rounded-[10px]'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid tenetur atque minus cum voluptatem dolorum.</p>
						<span className='text-[13px]'>1 min ago</span>
					</div>
				</div>

				<div className='max-w-[70%] flex gap-5'>{/* Messages */}
					<img className='w-[30px] h-[30px] rounded-full object-cover' src="./avatar.png" alt="avatar" />
					<div className='flex flex-1 flex-col gap-[5px]'>{/* Texts */}
						<p className='p-5 bg-[#1119284c] rounded-[10px]'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid tenetur atque minus cum voluptatem dolorum.</p>
						<span className='text-[13px]'>1 min ago</span>
					</div>
				</div>

				<div className='max-w-[70%] flex gap-5 items-end ml-auto'>{/* Messages Owner*/}
					<div className='flex flex-1 flex-col gap-[5px]'>{/* Texts */}
						<p className='p-5 bg-[#5183FE] rounded-[10px]'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid tenetur atque minus cum voluptatem dolorum.</p>
						<span className='text-[13px]'>1 min ago</span>
					</div>
				</div>

				<div className='max-w-[70%] flex gap-5'>{/* Messages */}
					<img className='w-[30px] h-[30px] rounded-full object-cover' src="./avatar.png" alt="avatar" />
					<div className='flex flex-1 flex-col gap-[5px]'>{/* Texts */}
						<p className='p-5 bg-[#1119284c] rounded-[10px]'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid tenetur atque minus cum voluptatem dolorum.</p>
						<span className='text-[13px]'>1 min ago</span>
					</div>
				</div>

				<div className='max-w-[70%] flex gap-5 items-end ml-auto'>{/* Messages Owner*/}
					<div className='flex flex-1 flex-col gap-[5px]'>{/* Texts */}
						<img className='w-full h-[300px] rounded-[10px] object-cover' src="https://images.pexels.com/photos/19155212/pexels-photo-19155212/free-photo-of-roof-on-a-yellow-building.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" /> {/* Image Inside text container*/}
						<p className='p-5 bg-[#5183FE] rounded-[10px]'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid tenetur atque minus cum voluptatem dolorum.</p>
						<span className='text-[13px]'>1 min ago</span>
					</div>
				</div>
				<div ref={endRef}></div>
			</div>
			<div className='flex items-center justify-between p-5 gap-5 border-t border-solid border-custom-gray mt-auto'>{/* Bottom */}
				<div className='flex gap-5'>{/* Icons */}
					<img className='w-5 h-5 cursor-pointer' src="./img.png" alt="img" />
					<img className='w-5 h-5 cursor-pointer' src="./camera.png" alt="camera" />
					<img className='w-5 h-5 cursor-pointer' src="./mic.png" alt="mic" />
				</div>

				<input className='flex-1 bg-customDarkBlue outline-none border-none text-white p-3 rounded-[10px] text-base' type="text" value={text} placeholder='Type a message...' onChange={e => setText(e.target.value)}/>

				<div className='relative'>{/* Emoji */}
					<img className='w-5 h-5 cursor-pointer' src="./emoji.png" alt="emoji" onClick={() => setOpen(prev => !prev)} />

					<div className='absolute left-0 bottom-[50px]'>{/* Picker */}
						<EmojiPicker open={open} onEmojiClick={handleEmoji} onOpenChange={setOpen} />
					</div>
				</div>
				<button className='bg-[#5183FE] text-white py-2 px-5 border-none rounded-xl cursor-pointer'>Send</button>
			</div>
		</div>
	)
}

export default Chat