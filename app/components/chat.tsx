"use client"

import { Message } from "@/utils/interfaces"
import { ABeeZee } from "next/font/google"
import { BiSend } from "react-icons/bi"
import { socket } from "@/app/lib/socket"
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
  status: string
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
    <div className="bg-stone-900 border-2 rounded-md size-5/6 grid grid-cols-4 grid-rows-6 overflow-clip">
      <div className="col-span-4 flex items-center px-8 bg-white/5 border-b-4 border-white/20">
        <h1 className={`text-7xl ${_ABeeZee.className} flex-1`}>AnonChat</h1>
        <h4>{props.status}</h4>
      </div>

      <div className="col-span-1 row-span-5 text-center bg-white/5 border-r-4 border-white/20">
        <h1 className="text-2xl py-4">Channels are coming "soon..."</h1>
      </div>

      <div className="col-span-3 row-span-5 grid grid-rows-8">
        <div
          className="row-span-7 flex flex-col overflow-y-scroll scrollbar-thin m-2"
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

        <div className="grid grid-cols-5 bg-white/5">
          <textarea
            className="bg-white/10 resize-none m-2 rounded-lg col-span-4 p-2 scrollbar-thin overflow-clip focus:outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                sendMessage()
              }
            }}
            ref={inputRef}
          />
          <div className="flex items-center justify-center">
            <Button onClick={sendMessage}>
              <BiSend size={40} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
