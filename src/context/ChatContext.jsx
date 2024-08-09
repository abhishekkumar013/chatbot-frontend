import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'
import { server } from '../main'
import toast from 'react-hot-toast'

const ChatContext = createContext()

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([])
  const [prompt, setPrompt] = useState('')
  const [newRequestLoading, setNewRequestLoading] = useState(false)
  const [chats, setChats] = useState([])
  const [selected, setSelected] = useState(() => {
    const savedSelected = localStorage.getItem('selectedChat')
    return savedSelected ? savedSelected : null
  })
  const [createLod, setCreateLod] = useState(false)
  const [loading, setLoading] = useState(false)
  // console.log('Hii', process.env)
  async function fetchResponse() {
    if (prompt === '') return alert('Write prompt')
    setNewRequestLoading(true)
    const currentPrompt = prompt
    setPrompt('')

    try {
      const apiKey = import.meta.env.VITE_GIMANI_API

      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
        method: 'post',
        data: {
          contents: [{ parts: [{ text: currentPrompt }] }],
        },
      })

      const message = {
        question: currentPrompt,
        answer:
          response['data']['candidates'][0]['content']['parts'][0]['text'],
      }

      setMessages((prev) => {
        if (Array.isArray(prev)) {
          return [...prev, message]
        } else {
          return [message]
        }
      })

      setNewRequestLoading(false)

      if (selected) {
        const { data } = await axios.post(
          `${server}/chat/${selected}`,
          {
            question: currentPrompt,
            answer:
              response['data']['candidates'][0]['content']['parts'][0]['text'],
          },
          {
            withCredentials: true,
          },
        )
      }
    } catch (error) {
      toast.error('Something went wrong')

      setNewRequestLoading(false)
    }
  }

  async function fetchChats() {
    try {
      const { data } = await axios.get(`${server}/chat/all`, {
        withCredentials: true,
      })
      // console.log('Chat data:', data)
      // setChats(Array.isArray(data.data) ? data.data : [])
      setChats(data.data)
      if (!selected && data.data && data.data.length > 0) {
        updateSelected(data.data[0]._id)
      }
    } catch (error) {
      setChats([])
    }
  }

  async function createChat() {
    setCreateLod(true)
    try {
      const { data } = await axios.post(
        `${server}/chat/new`,
        {},
        {
          withCredentials: true,
        },
      )

      const newChatId = data.data._id

      await fetchChats()
      updateSelected(newChatId)
      setCreateLod(false)
    } catch (error) {
      toast.error('Something went wrong')
      setCreateLod(false)
    }
  }

  async function fetchMessages() {
    if (!selected) return
    setLoading(true)
    try {
      const { data } = await axios.get(`${server}/chat/${selected}`, {
        withCredentials: true,
      })

      // setMessages(Array.isArray(data.data) ? data.data : [])
      setMessages(data.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setMessages([])
    }
  }

  async function deleteChat(id) {
    try {
      const { data } = await axios.delete(`${server}/chat/${id}`, {
        withCredentials: true,
      })

      toast.success(data.message)
      if (id === selected) {
        updateSelected(null)
      }
      await fetchChats()
      window.location.reload()
      if (chats.length === 0) {
        setMessages([])
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  const updateSelected = (newSelected) => {
    setSelected(newSelected)
    localStorage.setItem('selectedChat', newSelected)
  }

  useEffect(() => {
    fetchChats()
  }, [])

  useEffect(() => {
    if (selected && chats.length > 0) {
      fetchMessages()
    }
  }, [selected, chats])

  return (
    <ChatContext.Provider
      value={{
        fetchResponse,
        messages,
        prompt,
        setPrompt,
        newRequestLoading,
        chats,
        createChat,
        createLod,
        selected,
        setSelected: updateSelected,
        loading,
        setLoading,
        deleteChat,
        fetchChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export const ChatData = () => useContext(ChatContext)
