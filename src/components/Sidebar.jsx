import React from 'react'
import { IoIosCloseCircle } from 'react-icons/io'
import { ChatData } from '../context/ChatContext'
import { MdDelete } from 'react-icons/md'
import { LoadingSpinner } from './Loading'
import { UserData } from '../context/UserContext'
import { FiLogOut } from 'react-icons/fi'
import { BsChatLeftText } from 'react-icons/bs'

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { chats, createChat, createLod, setSelected, deleteChat } = ChatData()
  const { LogoutUser } = UserData()

  const deleteChatHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this chat?')) {
      deleteChat(id)
    }
  }

  const clickEvent = (id) => {
    setSelected(id)
    toggleSidebar()
  }

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transform transition-transform duration-300 ease-in-out 
                  ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                  md:relative md:translate-x-0 md:w-1/4`}
    >
      <div className="flex flex-col h-full p-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <BsChatLeftText className="text-2xl text-blue-500" />
            <h1 className="text-xl font-bold text-white">ChatAbhi</h1>
          </div>
          <button
            className="md:hidden text-gray-400 hover:text-white transition-colors"
            onClick={toggleSidebar}
          >
            <IoIosCloseCircle className="text-2xl" />
          </button>
        </div>

        <button
          onClick={createChat}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition-colors mb-4"
        >
          {createLod ? <LoadingSpinner /> : 'New Chat +'}
        </button>

        <div className="flex-grow overflow-y-auto">
          <p className="text-sm text-gray-400 mb-2 font-medium">Recent Chats</p>
          <div className="space-y-2">
            {chats && chats.length > 0 ? (
              chats.map((e) => (
                <div key={e._id} className="group relative">
                  <button
                    className="w-full text-left py-2 px-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors flex items-center space-x-2"
                    onClick={() => clickEvent(e._id)}
                  >
                    <BsChatLeftText className="text-gray-400 group-hover:text-blue-500 flex-shrink-0" />
                    <span className="text-gray-300 group-hover:text-white truncate text-sm">
                      {e.latestMessage.slice(0, 25)}...
                    </span>
                  </button>
                  <button
                    className="absolute right-2 top-1/2 transform -translate-y-1/2  transition-opacity"
                    onClick={() => deleteChatHandler(e._id)}
                  >
                    <MdDelete className="text-red-500 hover:text-red-600 text-lg" />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-2 text-sm">
                No chats yet
              </p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <button
            className="w-full py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold transition-colors flex items-center justify-center space-x-2"
            onClick={LogoutUser}
          >
            <FiLogOut className="text-lg" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
