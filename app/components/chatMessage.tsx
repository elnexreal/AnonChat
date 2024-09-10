interface MessageProps {
  stagger: number
  author: string
  content: string
}

export default function ChatMessage({ ...props }: MessageProps) {
  function isEven(valueToCheck: number): boolean {
    if (valueToCheck % 2 === 0) {
      return true
    }

    return false
  }

  return (
    <div
      className={`${
        isEven(props.stagger) ? "bg-white/10" : "bg-white/5"
      } flex flex-col gap-2 p-2`}
    >
      <span className="text-xs opacity-50">{props.author}</span>
      <p className="whitespace-pre-wrap break-words min-w-0 flex-1">
        {props.content}
      </p>
    </div>
  )
}
