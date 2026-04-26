import { cookies } from 'next/headers';

import { ApiResponse, CheckSessionRequest, User } from '@/types/user';
import { nextServer } from './api';
import { Note } from '@/types/note';

export const checkServerSession = async () => {
    const cookieStore = await cookies();
    const res = await nextServer.get('/auth/session', {
        headers: {
            Cookie: cookieStore.toString(),
        },
    });
    return res;
};

export async function fetchNotes(page: number, search: string, tag?: string): Promise<ApiResponse> {
    const options = {
        method: 'GET',
        params: {
            page,
            perPage: 12,
            search,
            tag,
        },
    };

    const { data } = await nextServer.get<ApiResponse>('/notes', options);
    return data;
}

export async function fetchNoteById(noteId: Note['id']): Promise<Note> {
    const { data } = await nextServer.get<Note>(`/notes/${noteId}`);
    return data;
}

export async function getMe() {
    const { data } = await nextServer.get<User>('/users/me');
    return data;
}

export async function checkSession() {
    const { data } = await nextServer.get<CheckSessionRequest>('/auth/session');
    return data.success;
}
