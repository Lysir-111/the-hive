'use client'

export const dynamic = 'force-dynamic'
export const revalidate = 0

import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import AccountComponent from './_components/account' // 🚀 确认路径正确

export default function AccountPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<Skeleton className="h-[80vh] w-full" />}>
        <AccountComponent />
      </Suspense>
    </div>
  )
}
