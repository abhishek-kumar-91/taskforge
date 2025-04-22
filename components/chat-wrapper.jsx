// components/chat-wrapper.jsx
'use client'

import { useOrganization } from '@clerk/nextjs'
import ChatBox from './chat-box'


export default function ChatWrapper() {
  const { organization } = useOrganization()

  if (!organization) return null

  return <ChatBox organizationId={organization.id} />
}
