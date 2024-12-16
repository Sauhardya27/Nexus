import React from 'react'

const UserInfo = () => {
  return (
	<div className='flex items-center justify-between p-5 '>
		<div className='flex items-center gap-5'>
			<img className='w-[50px] h-[50px] rounded-full object-cover' src="./avatar.png" alt="user-img" />
			<h2>John Doe</h2>
		</div>
		<div className='flex gap-5'>
			<img className='w-5 h-5 cursor-pointer' src="./more.png" alt="more" />
			<img className='w-5 h-5 cursor-pointer' src="./video.png" alt="video" />
			<img className='w-5 h-5 cursor-pointer' src="./edit.png" alt="edit" />
		</div>
	</div>
  )
}

export default UserInfo