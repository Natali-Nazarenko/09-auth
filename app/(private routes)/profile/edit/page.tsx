'use client';

import { useRouter } from 'next/navigation';
import css from './EditProfilePage.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import Image from 'next/image';
import { updateMe } from '@/lib/api/clientApi';

function EditProfile() {
    const router = useRouter();
    const { user, setUser } = useAuthStore();

    const handleSubmit = async (formData: FormData) => {
        const username = formData.get('username') as string;

        try {
            const updatedUser = await updateMe({ username });

            setUser(updatedUser);

            router.push('/profile');
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancel = () => {
        router.push('/profile');
    };

    return (
        <main className={css.mainContent}>
            <div className={css.profileCard}>
                <h1 className={css.formTitle}>Edit Profile</h1>

                <Image
                    src={user?.avatar || '/default-avatar.png'}
                    alt="User Avatar"
                    width={120}
                    height={120}
                    className={css.avatar}
                    priority
                />

                <form className={css.profileInfo} action={handleSubmit}>
                    <div className={css.usernameWrapper}>
                        <label htmlFor="username">Username:</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            defaultValue={user?.username}
                            className={css.input}
                        />
                    </div>

                    <p>Email: {user?.email}</p>

                    <div className={css.actions}>
                        <button type="submit" className={css.saveButton}>
                            Save
                        </button>

                        <button type="button" className={css.cancelButton} onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default EditProfile;
