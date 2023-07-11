'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useForm } from 'react-hook-form'
import { backdrop } from 'services'

interface State {
  email: string
  code: string
}

export default function Page() {
  const { register, handleSubmit } = useForm<State>({
    defaultValues: {
      email: '',
      code: ''
    }
  })
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false)
  const supabase = createClientComponentClient<Database>()
  return <div>Login</div>
}
