"use client"

import { useEffect, useState } from "react"
import { socket } from "./lib/socket"
import { Message } from "../utils/interfaces"
import Chat from "./components/chat"

export default function Home() {
  const [isConnected, setIsConnected] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  function onConnect() {
    setIsConnected(true)
  }

  function onDisconnect() {
    setIsConnected(false)
  }

  function onMessage(value: Message) {
    setMessages((previous) => [...previous, value])
  }

  useEffect(() => {
    if (socket.connected) {
      onConnect()
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

  return (
    <main className="h-dvh w-dvw">
      <Chat status={isConnected} messages={messages} />
    </main>
  )
}
