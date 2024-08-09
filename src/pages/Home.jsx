import React, { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Sidebar from '../components/Sidebar'
import { GiHamburgerMenu } from 'react-icons/gi'
import Header from '../components/Header'
import { ChatData } from '../context/ChatContext'
import { CgProfile } from 'react-icons/cg'
import { FaRobot, FaCopy } from 'react-icons/fa'
import { IoMdSend } from 'react-icons/io'
import { LoadingBig, LoadingSmall } from '../components/Loading'
import toast from 'react-hot-toast'

const Home = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleSidebar = () => setIsOpen(!isOpen)
  const {
    fetchResponse,
    messages,
    prompt,
    setPrompt,
    newRequestLoading,
    loading,
    chats,
  } = ChatData()

  const messageContainerRef = useRef()

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight
    }
  }, [messages])

  const CodeBlock = ({ language, value }) => (
    <div className="relative mt-2 mb-4">
      <CopyToClipboard
        text={value}
        onCopy={() => toast.success('Code copied!')}
      >
        <button className="absolute top-2 right-2 text-white bg-gray-600 p-1 rounded hover:bg-gray-500 transition-colors">
          <FaCopy />
        </button>
      </CopyToClipboard>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{ borderRadius: '0.375rem' }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  )

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="flex-none">
        <Header toggleSidebar={toggleSidebar} />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {loading ? (
              <LoadingBig />
            ) : (
              <div ref={messageContainerRef} className="space-y-4">
                {messages && messages.length > 0 ? (
                  messages.map((e, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-start space-x-2 bg-blue-600 bg-opacity-50 p-3 rounded-lg shadow-md">
                        <div className="flex-shrink-0 bg-white p-1.5 rounded-full text-blue-600 text-lg">
                          <CgProfile />
                        </div>
                        <div className="flex-1 break-words text-sm">
                          {e.question}
                        </div>
                      </div>
                      <div className="flex items-start space-x-2 bg-gray-700 bg-opacity-50 p-3 rounded-lg shadow-md relative">
                        <div className="flex-shrink-0 bg-white p-1.5 rounded-full text-gray-700 text-lg">
                          <FaRobot />
                        </div>
                        <div className="flex-1 markdown-content overflow-x-auto text-sm">
                          <ReactMarkdown
                            components={{
                              code({
                                node,
                                inline,
                                className,
                                children,
                                ...props
                              }) {
                                const match = /language-(\w+)/.exec(
                                  className || '',
                                )
                                return !inline && match ? (
                                  <CodeBlock
                                    language={match[1]}
                                    value={String(children).replace(/\n$/, '')}
                                    {...props}
                                  />
                                ) : (
                                  <code
                                    className={`${className} bg-gray-800 rounded px-1`}
                                    {...props}
                                  >
                                    {children}
                                  </code>
                                )
                              },
                            }}
                          >
                            {e.answer}
                          </ReactMarkdown>
                        </div>
                        <CopyToClipboard
                          text={e.answer}
                          onCopy={() => toast.success('Message copied!')}
                        >
                          <button className="absolute top-1 right-1 text-white bg-gray-600 p-1 rounded hover:bg-gray-500 transition-colors">
                            <FaCopy className="text-sm" />
                          </button>
                        </CopyToClipboard>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-400 mt-10 text-sm">
                    No chat yet. Start a conversation!
                  </p>
                )}
                {newRequestLoading && <LoadingSmall />}
              </div>
            )}
          </div>
          {chats && chats.length > 0 && (
            <div className="flex-none fixed p-2 bg-gray-800 bg-opacity-50 border-t border-gray-700">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  fetchResponse()
                }}
                className="flex items-center space-x-2"
              >
                <input
                  className="flex-grow p-2 bg-gray-700 rounded-lg text-white text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  type="text"
                  placeholder="Enter a prompt here..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  required
                />
                <button
                  className="p-2 bg-blue-600 rounded-lg text-xl text-white hover:bg-blue-500 transition-colors"
                  type="submit"
                >
                  <IoMdSend />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
