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
      } p-2 relative`}
    >
      <span className="text-xs absolute top-0 right-0 m-2">{props.author}</span>
      <p className="whitespace-pre-wrap">{props.content}</p>
    </div>
  )
}
