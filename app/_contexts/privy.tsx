"use client";

import React, { useMemo } from 'react';
import { PrivyProvider as PrivyProviderBase } from '@privy-io/react-auth';
import type { PrivyClientConfig } from '@privy-io/react-auth';
import { toSolanaWalletConnectors } from '@privy-io/react-auth/solana';
import '@/components/utils/suppress-console'

// 环境变量校验
if (typeof window === 'undefined' && !process.env.NEXT_PUBLIC_PRIVY_APP_ID) {
  console.error('Missing NEXT_PUBLIC_PRIVY_APP_ID env var');
}
if (typeof window === 'undefined' && !process.env.NEXT_PUBLIC_SOLANA_RPC_URL) {
  console.error('Missing NEXT_PUBLIC_SOLANA_RPC_URL env var');
}

interface Props {
    children: React.ReactNode;
}

const solanaConnectors = toSolanaWalletConnectors({
    shouldAutoConnect: true,
});

export const PrivyProvider: React.FC<Props> = ({ children }) => {
  const privyConfig: PrivyClientConfig = useMemo(() => ({
    appearance: {
      theme: 'dark' as const, // 明确指定为字面量类型
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
    process.env.NEXT_PUBLIC_SOLANA_RPC_URL,
    process.env.NEXT_PUBLIC_BASE_URL
  ]);

  return (
    <PrivyProviderBase
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      config={privyConfig}
    >
      {children}
    </PrivyProviderBase>
  )
}
