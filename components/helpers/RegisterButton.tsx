"use client"
import { Button } from '@heroui/react'
import React from 'react'
import Link from 'next/link'

const RegisterButton = () => {
  return (
    <div>
        <Link href="/register">
      <Button className='bg-colorFirst text-white font-bold text-lg px-10 py-4 rounded-lg'>
        Kayıt Ol
      </Button>
      </Link>
    </div>
  )
}

export default RegisterButton
