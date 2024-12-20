import React from 'react'

const Detail = () => {
  return (
    <div className='flex-1 max-w-full overflow-auto scrollbar-thin scrollbar-thumb-[#131e33ab] scrollbar-track-transparent'>{/* Detail */}
      <div className='py-[30px] px-5 flex flex-col items-center gap-[15px] border-b border-solid border-custom-gray'>{/* User */}
        <img className='w-[100px] h-[100px] rounded-full object-cover' src="./avatar.png" alt="avatar" />
        <h2>Jane Doe</h2>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>

      <div className='p-5 flex flex-col gap-[15px]'>{/* Info */}
        <div>{/* Option */}
          <div className='flex items-center justify-between'>{/* Title */}
            <span>Chat settings</span>
            <img className='w-[30px] h-[30px] bg-[#1119284c] p-[10px] rounded-full cursor-pointer' src="./arrowUp.png" alt="arrowUp" />
          </div>
        </div>

        <div>{/* Option */}
          <div className='flex items-center justify-between'>{/* Title */}
            <span>Chat settings</span>
            <img className='w-[30px] h-[30px] bg-[#1119284c] p-[10px] rounded-full cursor-pointer' src="./arrowUp.png" alt="arrowUp" />
          </div>
        </div>

        <div>{/* Option */}
          <div className='flex items-center justify-between'>{/* Title */}
            <span>Privacy & Help</span>
            <img className='w-[30px] h-[30px] bg-[#1119284c] p-[10px] rounded-full cursor-pointer' src="./arrowUp.png" alt="arrowUp" />
          </div>
        </div>

        <div>{/* Option */}
          <div className='flex items-center justify-between'>{/* Title */}
            <span>Shared photos</span>
            <img className='w-[30px] h-[30px] bg-[#1119284c] p-[10px] rounded-full cursor-pointer' src="./arrowDown.png" alt="arrowUp" />
          </div>

          <div className='flex flex-col gap-5 my-5'>{/* Photos */}
            <div className='flex items-center justify-between'>{/* PhotoItem */}
              <div className='flex items-center gap-5'>{/* PhotoDetail */}
                <img className='w-[40px] h-[40px] rounded-[5px] object-cover' src="https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" alt="photoItem" />
                <span className='text-sm text-gray-300 font-light'>photo_2024_2.png</span>
              </div>
              <img className='w-[30px] h-[30px] bg-[#1119284c] p-[10px] rounded-full cursor-pointer' src="./download.png" alt="download" />
            </div>

            <div className='flex items-center justify-between'>{/* PhotoItem */}
              <div className='flex items-center gap-5'>{/* PhotoDetail */}
                <img className='w-[40px] h-[40px] rounded-[5px] object-cover' src="https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" alt="photoItem" />
                <span className='text-sm text-gray-300 font-light'>photo_2024_2.png</span>
              </div>
              <img className='w-[30px] h-[30px] bg-[#1119284c] p-[10px] rounded-full cursor-pointer' src="./download.png" alt="download" />
            </div>

            <div className='flex items-center justify-between'>{/* PhotoItem */}
              <div className='flex items-center gap-5'>{/* PhotoDetail */}
                <img className='w-[40px] h-[40px] rounded-[5px] object-cover' src="https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" alt="photoItem" />
                <span className='text-sm text-gray-300 font-light'>photo_2024_2.png</span>
              </div>
              <img className='w-[30px] h-[30px] bg-[#1119284c] p-[10px] rounded-full cursor-pointer' src="./download.png" alt="download" />
            </div>

            <div className='flex items-center justify-between'>{/* PhotoItem */}
              <div className='flex items-center gap-5'>{/* PhotoDetail */}
                <img className='w-[40px] h-[40px] rounded-[5px] object-cover' src="https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" alt="photoItem" />
                <span className='text-sm text-gray-300 font-light'>photo_2024_2.png</span>
              </div>
              <img className='w-[30px] h-[30px] bg-[#1119284c] p-[10px] rounded-full cursor-pointer' src="./download.png" alt="download" />
            </div>
          </div>

          <div>{/* Option */}
            <div className='flex items-center justify-between'>{/* Title */}
              <span>Shared Files</span>
              <img className='w-[30px] h-[30px] bg-[#1119284c] p-[10px] rounded-full cursor-pointer' src="./arrowUp.png" alt="arrowUp" />
            </div>
          </div>
          <button className='p-[15px] mt-5 mb-3 bg-customPink hover:bg-hoverRed text-white border-none rounded-[5px] cursor-pointer w-full'>Block User</button>
          <button className='p-[10px] bg-[#1A73E8] border-none rounded-[5px] cursor-pointer w-full'>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default Detail