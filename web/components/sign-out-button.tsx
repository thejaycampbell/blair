'use client'

import { signOut, useSession } from 'next-auth/react'

export function SignOutButton() {
  const { data: session } = useSession()

  if (!session) return null

  return (
    <div className="flex items-center justify-between">
      <span className="text-neutral-600 text-xs truncate max-w-[120px]">
        {session.user?.email}
      </span>
      <button
        onClick={() => signOut()}
        className="text-neutral-600 hover:text-neutral-400 text-xs transition-colors ml-2 flex-shrink-0"
      >
        Sign out
      </button>
    </div>
  )
}
