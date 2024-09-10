import { ReactNode } from "react"

interface ButtonProps {
  children?: ReactNode
  className?: string
  onClick?: () => void
}

export default function Button({ ...props }: ButtonProps) {
  return (
    <button
      className={`p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}
