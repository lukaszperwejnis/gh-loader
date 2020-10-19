import React, {useEffect, useState} from 'react';
import {getUserByUsername} from './dashboard.service';
import {User} from '../../types/User';

export const Dashboard = (): JSX.Element => {
    const [user, setUser] = useState<User>(null);
    useEffect(() => {
        getUserByUsername('lukaszperwejnis').then((response) => {
            console.log(response);
            setUser(response);
        });
    }, []);

    return <div>{user ? user.login : 'Enter username'}</div>;
};
