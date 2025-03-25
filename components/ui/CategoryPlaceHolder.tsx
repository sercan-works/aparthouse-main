import { Card } from '@heroui/react'
import { Skeleton } from '@heroui/react'
import React from 'react'

const CategoryPlaceHolder = () => {
  return (
    <div >
      <Card className="w-24 h-24  space-y-5 p-4" radius="lg">
      <Skeleton className="rounded-lg">
        <div className="h-20 rounded-lg bg-default-300" />
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-2 w-3/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-2 w-4/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-2 w-2/5 rounded-lg bg-default-300" />
        </Skeleton>
      </div>
    </Card>
    </div>
  )
}

export default CategoryPlaceHolder
