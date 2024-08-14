'use client'

import { Button } from '@/components/ui/button'
import { FaGithub, FaGoogle } from 'react-icons/fa'
import { createBrowserClient } from '@supabase/ssr'
import { usePathname } from 'next/navigation'
import { useState, useCallback } from 'react'

type Provider = 'github' | 'google';

const LoginForm = () => {
    const [isLoading, setIsLoading] = useState<Provider | null>(null);
    const pathname = usePathname();

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const handleLogin = useCallback(async (provider: Provider) => {
        try {
            setIsLoading(provider);
            const { error } = await supabase.auth.signInWithOAuth({
                provider,
                options: {
                    redirectTo: `${window.location.origin}/auth/callback?next=${pathname}`
                }
            });
            if (error) throw error;
        } catch (error) {
            console.error(`${provider} login error:`, error);
            // ここでユーザーにエラーを通知するロジックを追加
        } finally {
            setIsLoading(null);
        }
    }, [pathname, supabase.auth]);

    return (
        <div className="flex flex-col gap-4">
            <Button
                onClick={() => handleLogin('github')}
                variant="outline"
                className='flex items-center gap-2'
                disabled={isLoading !== null}
            >
                <FaGithub size={20} />
                {isLoading === 'github' ? 'ログイン中...' : 'GitHubでログイン'}
            </Button>
            <Button
                onClick={() => handleLogin('google')}
                variant="outline"
                className='flex items-center gap-2'
                disabled={isLoading !== null}
            >
                <FaGoogle size={20} />
                {isLoading === 'google' ? 'ログイン中...' : 'Googleでログイン'}
            </Button>
        </div>
    )
}

export default LoginForm