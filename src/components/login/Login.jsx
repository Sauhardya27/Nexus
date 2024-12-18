import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify';

const Login = () => {
	const [avatar, setAvatar] = useState({
		file: null,
		url: ""
	});

	const handleAvatar = e => {
		if(e.target.files[0]){
			setAvatar({
				file: e.target.files[0],
				url: URL.createObjectURL(e.target.files[0])
			});
		}
	}

	const handleLogin = e => {
		e.preventDefault();
		toast.warn("Hello")
	}

	return (
		<div className='w-full h-full flex items-center gap-[100px]'>{/* Login */}
			<div className='flex-1 flex flex-col items-center gap-5'>{/* Item */}
				<h2 className='text-3xl font-bold'>Welcome back,</h2>
				<form className='flex flex-col items-center justify-center gap-5' onSubmit={handleLogin}>
					<input className='p-3 border-none outline-none bg-[#111928] bg-opacity-60 text-white rounded-[5px]' type="text" name='email' placeholder='Email' />
					<input className='p-3 border-none outline-none bg-[#111928] bg-opacity-60 text-white rounded-[5px]' type="password" name='password' placeholder='Password' />
					<button className='w-full p-3 border-none bg-[#1F8EF1] text-white rounded-[5px] cursor-pointer font-medium'>Sign in</button>
				</form>
			</div>
			<div className='h-[80%] w-[2px] bg-customGray'>{/* Separator */}

			</div>
			<div className='flex-1 flex flex-col items-center gap-5'>{/* Item */}
				<h2 className='text-3xl font-bold'>Create an Account</h2>
				<form className='flex flex-col items-center justify-center gap-5'>
					<label className='w-full flex items-center justify-center gap-10 cursor-pointer underline' htmlFor="file">
						<img className='w-[50px] h-[50px] rounded-[10px] object-cover opacity-60' src={avatar.url || "./avatar.png"} alt="avatar" />
						Upload an image
					</label>
					<input className='p-3 border-none outline-none bg-[#111928] bg-opacity-60 text-white rounded-[5px] hidden' type="file" name="avatar" id="file" onChange={handleAvatar}/>
					<input className='p-3 border-none outline-none bg-[#111928] bg-opacity-60 text-white rounded-[5px]' type="text" name='username' placeholder='Username' />
					<input className='p-3 border-none outline-none bg-[#111928] bg-opacity-60 text-white rounded-[5px]' type="text" name='email' placeholder='Email' />
					<input className='p-3 border-none outline-none bg-[#111928] bg-opacity-60 text-white rounded-[5px]' type="password" name='password' placeholder='Password' />
					<button className='w-full p-3 border-none bg-[#1F8EF1] text-white rounded-[5px] cursor-pointer font-medium'>Sign Up</button>
				</form>
			</div>
		</div>
	)
}

export default Login