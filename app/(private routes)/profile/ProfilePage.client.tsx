'use client';

import Link from 'next/link';
import Image from 'next/image';
import css from './ProfilePage.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { User } from '@/types/user';

type ProfileProps = {
    user: User;
};

function Profile({ user }: ProfileProps) {
    const router = useRouter();
    const { isAuthenticated } = useAuthStore();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/sign-in');
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) return null;

    return (
        <main className={css.mainContent}>
            <div className={css.profileCard}>
                <div className={css.header}>
                    <h1 className={css.formTitle}>Profile Page</h1>
                    <Link href="/profile/edit" className={css.editProfileButton}>
                        Edit Profile
                    </Link>
                </div>
                <div className={css.avatarWrapper}>
                    <Image
                        src={user.avatar}
                        alt="User Avatar"
                        width={120}
                        height={120}
                        className={css.avatar}
                        priority
                    />
                </div>
                <div className={css.profileInfo}>
                    <p>Username: {user.username}</p>
                    <p>Email: {user?.email}</p>
                </div>
            </div>
        </main>
    );
}
export default Profile;
