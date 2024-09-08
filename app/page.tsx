"use client"

import { useEffect, useState } from "react"
import { socket } from "./lib/socket"

export default function Home() {
  const [isConnected, setIsConnected] = useState(false)
  const [transport, setTransport] = useState("N/A")
  const [message, setMessage] = useState<string>("no message lol")

  useEffect(() => {
    if (socket.connected) {
      onConnect()
    }

    function onConnect() {
      setIsConnected(true)
      setTransport(socket.io.engine.transport.name)

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name)
      })
    }

    function onDisconnect() {
      setIsConnected(false)
      setTransport("N/A")
    }

    socket.on("connect", onConnect)
    socket.on("disconnect", onDisconnect)
    socket.on("message", (message) => {
      setMessage(message)
    })

    return () => {
      socket.off("connect", onConnect)
      socket.off("disconnect", onDisconnect)
    }
  }, [])

  function sendMessage() {
    socket.send(
      "If you didn't click the button it means it works, if you clicked the button it also works hah trollface  me"
    )
  }

  return (
    <div>
      <p>Status: {isConnected ? "connected" : "disconnected"}</p>
      <p>Transport: {transport}</p>
      <hr />

      <button onClick={sendMessage} className="p-2 bg-green-500">
        Test message sending
      </button>
      <p>Message: {message}</p>
    </div>
  )
}
