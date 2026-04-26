import { Metadata } from 'next';

import ProfilePageClient from './ProfilePage.client';
import { getMe } from '@/lib/api/serverApi';

export const metaData: Metadata = {
    title: 'Profile - NoteHub',
    description: 'User profile page',
    openGraph: {
        title: 'Profile - NoteHub',
        description: 'User profile page',
        url: 'https://https://vercel.com/natali-nazarenkos-projects/09-auth/profile',
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
    return <ProfilePageClient user={user} />;
}
export default Profile;
