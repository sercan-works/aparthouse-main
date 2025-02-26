"use client"
import React from 'react'
import Link from 'next/link'
import { Button } from '@heroui/react'

const AMPButton = () => {
  return (
      <Link href={process.env.KONAKLAMA_YONETIM_PANELI_URL || ""}>
        <Button className='bg-colorFirst text-white font-bold'>Konaklama Yönetim Paneli</Button>
      </Link>
  )
}

export default AMPButton
