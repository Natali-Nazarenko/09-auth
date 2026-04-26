import { Metadata } from 'next';

import Link from 'next/link';
import Image from 'next/image';
import css from './ProfilePage.module.css';

import { getMe } from '@/lib/api/serverApi';

export const metadata: Metadata = {
    title: 'Profile - NoteHub',
    description: 'User profile page',
    openGraph: {
        title: 'Profile - NoteHub',
        description: 'User profile page',
        url: 'https://vercel.com/natali-nazarenkos-projects/09-auth/profile',
        images: [
            {
                url: 'https://ethnomir.ru/upload/medialibrary/77b/kolibri.jpg',
                width: 1200,
                height: 630,
                alt: 'User profile',
            },
        ],
    },
};

async function Profile() {
    const user = await getMe();
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
                    <p>Email: {user.email}</p>
                </div>
            </div>
        </main>
    );
}
export default Profile;
