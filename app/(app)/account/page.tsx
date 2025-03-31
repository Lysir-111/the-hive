'use client'

import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary'
import AccountComponent from './_components/account'
import AuthErrorFallback from './_components/auth-error-fallback'

/**
 * 安全导出的页面组件
 * - 强制动态渲染避免 SSR 问题
 * - 添加错误边界和加载状态
 * - 隔离 Privy 的客户端依赖
 */
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function AccountPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <ErrorBoundary errorComponent={AuthErrorFallback}>
        <Suspense fallback={<AccountSkeleton />}>
          <AccountComponent />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

function AccountSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-10 w-1/3" />
      <div className="grid gap-6">
        <Skeleton className="h-[300px] w-full" />
        <Skeleton className="h-[200px] w-full" />
      </div>
    </div>
  )
}
