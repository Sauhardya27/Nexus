import React from 'react'

const AddUser = () => {
  return (
	<div className='p-[30px] bg-[#111928C7] rounded-[10px] absolute top-0 bottom-0 left-0 right-0 m-auto w-max h-max'>{/* AddUser */}
		<form className='flex gap-5'>
			<input className='p-3 rounded-[10px] border-none outline-none' type="text" name='username' placeholder='Username' />
			<button className='p-3 rounded-[10px] border-none bg-[#1A73E8] text-white cursor-pointer'>Search</button>
		</form>
		<div className='flex items-center justify-between mt-[50px]'>{/* User */}
			<div className='flex items-center gap-5'>{/* Detail */}
				<img className='w-[50px] h-[50px] rounded-full object-cover' src="./avatar.png" alt="avatar" />
				<span>Jane Doe</span>
			</div>
			<button className='p-[10px] rounded-[10px] border-none bg-[#1A73E8] text-white cursor-pointer'>Add User</button>
		</div>
	</div>
  )
}

export default AddUser