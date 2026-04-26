import { cookies } from 'next/headers';

import { User } from '@/types/user';
import { nextServer } from './api';
import { Note } from '@/types/note';
import { ApiResponse, CheckSessionRequest } from '@/types/request';

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
        params: {
            page,
            perPage: 12,
            search,
            tag,
        },
        headers: {
            Cookie: cookieStore.toString(),
        },
    };

    const { data } = await nextServer.get<ApiResponse>('/notes', options);
    return data;
}

export async function fetchNoteById(noteId: Note['id']): Promise<Note> {
    const { data } = await nextServer.get<Note>(`/notes/${noteId}`, {
        headers: {
            Cookie: cookieStore.toString(),
        },
    });
    return data;
}

export async function getMe(cookieHeader: string) {
    const { data } = await nextServer.get<User>('/users/me', {
        headers: {
            Cookie: cookieHeader,
        },
    });
    return data;
}

export async function checkSession() {
    const { data } = await nextServer.get<CheckSessionRequest>('/auth/session', {
        headers: {
            Cookie: cookieStore.toString(),
        },
    });
    return data;
}
