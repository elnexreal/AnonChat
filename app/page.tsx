"use client"

import { useEffect, useState, useRef } from "react"
import { socket } from "./lib/socket"
import { Message } from "@/utils/interfaces"

export default function Home() {
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected)
  const [messages, setMessages] = useState<Message[] | []>([])
  const msgInput = useRef("")

  useEffect(() => {
    function onConnect() {
      setIsConnected(true)
    }

    function onDisconnect() {
      setIsConnected(false)
    }

    function onMessage(value: string) {
      const message: Message = JSON.parse(value)

      setMessages((previous) => [...previous, message])
    }

    socket.on("connect", onConnect)
    socket.on("disconnect", onDisconnect)
    socket.on("message", onMessage)

    return () => {
      socket.off("connect", onConnect)
      socket.off("disconnect", onDisconnect)
      socket.off("message", onMessage)
    }
  }, [messages])

  function sendMessage() {
    socket.send(
      JSON.stringify({
        author: "anon",
        content: msgInput.current,
      })
    )
  }

  return (
    <div className="flex gap-4 text-black m-16">
      <input
        type="text"
        onChange={(e) => {
          msgInput.current = e.target.value
        }}
      />
      <button onClick={sendMessage} className="p-2 bg-green-500">
        Test message sending
      </button>
      {messages.map((msg, index) => (
        <p key={index} className="text-white">
          {msg.content}
        </p>
      ))}
    </div>
  )
}
