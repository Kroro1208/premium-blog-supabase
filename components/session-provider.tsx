"use client"

import { useUser } from '@/lib/store/user';
import { createBrowserClient } from '@supabase/ssr';
import { useEffect } from 'react'

const SessionProvider = ({ children }: { children: React.ReactNode }) => {
    const setUser = useUser((state) => state.setUser);
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    useEffect(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? undefined);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [supabase, setUser]);

    return children;
}

export default SessionProvider;