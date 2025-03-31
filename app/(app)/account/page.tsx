'use client' // 必须添加
export const dynamic = 'force-dynamic'
export const revalidate = 0


import { Suspense } from 'react'
import AccountComponent from './_components/account'

export default function AccountPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AccountComponent />
    </Suspense>
  )
}
