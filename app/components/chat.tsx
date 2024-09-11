"use client"

import { Message } from "../../utils/interfaces"
import { ABeeZee } from "next/font/google"
import { BiSend } from "react-icons/bi"
import { socket } from "../../app/lib/socket"
import { useEffect, useRef } from "react"
import Button from "./button"
import ChatMessage from "./chatMessage"

const _ABeeZee = ABeeZee({
  subsets: ["latin"],
  display: "auto",
  weight: "400",
  style: "italic",
})

interface ChatProps {
  messages: Message[]
  status: boolean
}

export default function Chat({ ...props }: ChatProps) {
  const divRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  function sendMessage() {
    if (inputRef.current?.value === "") return

    socket.send(
      JSON.stringify({
        content: inputRef.current?.value,
      })
    )

    if (inputRef.current?.value) {
      inputRef.current.value = ""
    }
  }

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight
    }
  }, [props.messages])

  return (
    <div className="bg-stone-900 size-full flex flex-col">
      {/* Navbar */}
      <div className="flex flex-col md:flex-row items-center justify-center md:p-8 bg-white/5 border-b-2 border-white/20">
        <h1 className={`text-3xl md:text-6xl ${_ABeeZee.className} md:flex-1`}>
          AnonChat
        </h1>
        {props.status ? (
          <span className="text-green-500">Connected.</span>
        ) : (
          <span className="text-red-500">Disconnected</span>
        )}
      </div>

      <div className="flex size-full overflow-hidden">
        {/* Channel list */}
        <div className={`text-center bg-white/5 overflow-clip`}>
          <h1 className="text-2xl py-4">Channels are coming "soon..."</h1>
        </div>

        <div className="flex flex-col size-full">
          {/* Messages list */}
          <div
            className="flex-1 flex flex-col overflow-y-scroll scrollbar-thin m-2"
            ref={divRef}
          >
            {props.messages.map((msg, index) => {
              return (
                <ChatMessage
                  key={index}
                  stagger={index}
                  author={msg.author}
                  content={msg.content}
                />
              )
            })}
          </div>

          {/* Input & buttons */}
          <div className="flex gap-2 p-2 bg-white/5">
            <textarea
              className="bg-white/10 resize-none rounded-lg flex-1 p-2 scrollbar-thin overflow-clip focus:outline-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  sendMessage()
                }
              }}
              ref={inputRef}
            />
            <div className="flex gap-2 items-center justify-center">
              <Button onClick={sendMessage}>
                <BiSend size={40} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
