import { Skeleton } from '@heroui/react'
import { Card } from '@heroui/react'
import React from 'react'

const CardPlaceholder = () => {
  return (
    <Card className="w-[23rem] h-[22.5rem] sm:w-[360px] sm:h-[360px] md:w-[320px] md:h-[320px] lg:w-[280px] lg:h-[280px] cursor-pointer space-y-5 p-4" radius="lg">
      <Skeleton className="rounded-lg">
        <div className="h-24 rounded-lg bg-default-300" />
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-default-300" />
        </Skeleton>
      </div>
    </Card>
  )
}

export default CardPlaceholder
