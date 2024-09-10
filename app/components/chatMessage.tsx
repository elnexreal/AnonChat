interface MessageProps {
  stagger: number
  author: string
  content: string
}

export default function ChatMessage({ ...props }: MessageProps) {
  console.log(props.stagger)
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
      } flex p-2`}
    >
      <p className="whitespace-pre-wrap break-words min-w-0 flex-1">
        {props.content}
      </p>
      <span className="text-xs m-2">{props.author}</span>
    </div>
  )
}
