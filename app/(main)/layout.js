// app/(main)/layout.js
import ChatWrapper from '@/components/chat-wrapper'

export default function Layout({ children }) {
  return (
    <div className="container mx-auto mt-5 px-4">
      {children}
      <ChatWrapper />
    </div>
  )
}
