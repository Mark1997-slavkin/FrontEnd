import React, { useEffect } from 'react'
import { useUserStore } from '../store/user.store';
import { userService } from '../services/user.services';
import UsersTable, { createUserData } from '../components/UsersTable';

export default function AdminPage() {
    const { users, setUsers } = useUserStore();

    useEffect(() => {
        if (!users) {
            userService.getUsers().then(setUsers);
        }
    }, []);

    return (
        <UsersTable rows={(users || []).map(createUserData)} />
    );
}
