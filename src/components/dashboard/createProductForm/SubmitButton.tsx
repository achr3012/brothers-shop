'use client'

import React from 'react'
import { useFormStatus } from 'react-dom'

export function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus()

  return <button type='submit' aria-disabled={pending} disabled={pending}>{children}</button>
}