import React from 'react'
import { ChatData } from '../context/ChatContext'
import { GiHamburgerMenu } from 'react-icons/gi'

const Header = ({ toggleSidebar }) => {
  const { chats } = ChatData()

  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 shadow-md flex items-center justify-between">
      <button onClick={toggleSidebar} className="md:hidden text-white p-1">
        <GiHamburgerMenu size={24} />
      </button>
      <div className="text-center flex-grow">
        {chats && chats.length === 0 ? (
          <h4 className="text-sm opacity-80">
            Create a new chat to get started
          </h4>
        ) : (
          <p className="text-sm opacity-80">How can I assist you today?</p>
        )}
      </div>
    </header>
  )
}

export default Header
