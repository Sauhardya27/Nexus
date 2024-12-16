import React from 'react'
import UserInfo from './userinfo/UserInfo'
import ChatList from './chatList/ChatList'

const List = () => {
	return (
		<div className='flex-1 flex flex-col'>
			<UserInfo />
			<ChatList />
		</div>
	)
}

export default List