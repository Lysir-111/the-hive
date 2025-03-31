"use client";

import React, { useMemo } from 'react';  //  修改开始：添加 useMemo
import { PrivyProvider as PrivyProviderBase } from '@privy-io/react-auth';
import { toSolanaWalletConnectors } from '@privy-io/react-auth/solana';
import '@/components/utils/suppress-console'

//  修改开始：添加环境变量校验
if (typeof window === 'undefined' && !process.env.NEXT_PUBLIC_PRIVY_APP_ID) {
  console.error('Missing NEXT_PUBLIC_PRIVY_APP_ID env var');
}
if (typeof window === 'undefined' && !process.env.NEXT_PUBLIC_SOLANA_RPC_URL) {
  console.error('Missing NEXT_PUBLIC_SOLANA_RPC_URL env var');
}
//  修改结束

interface Props {
    children: React.ReactNode;
}

const solanaConnectors = toSolanaWalletConnectors({
    shouldAutoConnect: true,
});

export const PrivyProvider: React.FC<Props> = ({ children }) => {
  //  修改开始：动态客户端配置
  const privyConfig = useMemo(() => ({
    appearance: {
      theme: 'dark',
      accentColor: '#d19900',
      logo: 'https://www.askthehive.ai/logo-dark.png',
      walletChainType: 'solana-only',
      showWalletLoginFirst: true,
    },
    loginMethods: ['email', 'wallet', 'google', 'twitter', 'discord', 'github'],
    externalWallets: {
      solana: {
        connectors: solanaConnectors
      }
    },
    solanaClusters: [
      {
        name: 'mainnet-beta',
        rpcUrl: process.env.NEXT_PUBLIC_SOLANA_RPC_URL!,
      }
    ],
    //  新增关键配置
    loginUrl: typeof window !== 'undefined' 
      ? `${window.location.origin}/login`
      : process.env.NEXT_PUBLIC_BASE_URL + '/login',
    callbackUrl: typeof window !== 'undefined'
      ? `${window.location.origin}/account`
      : process.env.NEXT_PUBLIC_BASE_URL + '/account',
    embeddedWallets: {
      noPromptOnSignature: true
    }
  }), [
    //  依赖项明确列出
    process.env.NEXT_PUBLIC_SOLANA_RPC_URL,
    process.env.NEXT_PUBLIC_BASE_URL
  ]);
  //  修改结束

  return (
    <PrivyProviderBase
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      config={privyConfig}  //  修改：使用动态配置
    >
      {children}
    </PrivyProviderBase>
  )
}
