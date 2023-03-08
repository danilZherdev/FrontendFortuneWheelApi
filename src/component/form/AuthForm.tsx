import React, { FormEvent, useState } from 'react';
import axios from 'axios';

const AuthForm = () => {

    const actionUrl = "/user/admin/auth";

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const authenticate = (e: FormEvent) => {
        e.preventDefault();
        axios.post(actionUrl, {
            email: email,
            hash: password
        }).then(response => {
            console.log("Response ", response)
            if(response.status === 200) {
                localStorage.setItem('tokenData', response.data.token)
                console.log('Data from local storage ', localStorage.getItem('tokenData'))
            }
        }).catch(error => {
            console.log("Response ", error)
            alert("ERROR " + error);
        }).finally(() => {
            alert("FINISHED");
        })
    }

    return (
        <>
            <form style={{
                display: 'flex',
                flexDirection: 'column'
            }} onSubmit={authenticate}>
                <label>Введите email</label>
                <input
                    type={'email'}
                    placeholder={'Введите email сюда'}
                    value={email}
                    onChange={(text) => setEmail(text.target.value)}
                />
                <br />
                <label>Введите пароль</label>
                <input
                    type={'password'}
                    placeholder={'Введите пароль сюда'}
                    value={password}
                    onChange={(text) => setPassword(text.target.value)}
                />
                <br />
                <input type={'submit'} value='Авторизоваться' />
            </form>
        </>
    )
}

export default AuthForm;