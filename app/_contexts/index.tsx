'use client'

import { Analytics } from '@vercel/analytics/react'
import dynamic from 'next/dynamic'
import { ColorModeProvider } from './color-mode'

//  修改开始：动态加载可能引起 SSR 问题的提供者
const PostHogProvider = dynamic(
  () => import('./posthog').then(mod => mod.PostHogProvider),
  { ssr: false }
)

const PrivyProvider = dynamic(
  () => import('./privy').then(mod => mod.PrivyProvider),
  { 
    ssr: false,
    loading: () => <div className="fixed inset-0 bg-background" />
  }
)
//  修改结束

interface Props {
  children: React.ReactNode
}

export default function Providers({ children }: Props) {
  return (
    //  修改开始：使用动态加载的组件
    <PostHogProvider>
      <PrivyProvider>
        <ColorModeProvider>
          <Analytics />
          {children}
        </ColorModeProvider>
      </PrivyProvider>
    </PostHogProvider>
    //  修改结束
  )
}

export * from './color-mode'
