import axios from 'axios';
import type { Note } from '@/types/note';
import type { LoginRequest, RegisterRequest, User } from '@/types/requests';

interface ApiResponse {
    notes: Note[];
    totalPages: number;
}

interface CreateNote {
    title: string;
    content: string;
    tag: string;
}

const myKey = process.env.NEXT_PUBLIC_API_URL;
// axios.defaults.headers.common['Authorization'] = `Bearer ${myKey}`;
axios.defaults.headers.common['accept'] = 'application/json';

const nextServer = axios.create({
    baseURL: `${myKey}/api`,
    withCredentials: true,
});

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

export async function createNote(payload: CreateNote): Promise<Note> {
    const { data } = await nextServer.post<Note>('/notes', payload);
    return data;
}

export async function deleteNote(noteId: Note['id']): Promise<Note> {
    const { data } = await nextServer.delete<Note>(`/notes/${noteId}`);
    return data;
}

export async function fetchNoteById(noteId: Note['id']): Promise<Note> {
    const { data } = await nextServer.get<Note>(`/notes/${noteId}`);
    return data;
}

export async function register(request: RegisterRequest) {
    const { data } = await nextServer.post<User>('/auth/register', request);
    console.log(data);
    return data;
}

export async function login(request: LoginRequest) {
    const { data } = await nextServer.post<User>('/auth/login', request);
    console.log(data);
    return data;
}
