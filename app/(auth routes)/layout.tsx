'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function AuthLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    useEffect(() => {
        router.refresh();
    }, [router]);
    return <>{children}</>;
}

export default AuthLayout;
