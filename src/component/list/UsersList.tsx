import axios, { AxiosRequestConfig } from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { UserData } from '../../dto/data/UserData';
import Page from '../../dto/Page';


export const UsersList = () => {
    const defaultPageSize = 1;

    const [page, setPage] = useState<Page<UserData>>({
        number: 0,
        size: defaultPageSize,
        totalPages: 0,
        totalCount: 0,
        items: []
    });

    const listUrl = `/user/all/${page.number}/${defaultPageSize}`;

    const getUsers = () => {
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('tokenData')}`
            }
        }

        const request = axios.get(listUrl, config);

        request.then(response => {
            console.log("Response ", response)
            const lPage = response.data as Page<UserData>;
            setPage(lPage);
        }).catch(error => {
            console.log("Response ", error)
            alert("ERROR " + error);
        })
    }

    useEffect(() => getUsers, [])

    const nextPage = () => {
        const next = page.number + 1;
        if (next > page.totalPages) {
            return;
        }
        setPage({
            ...page,
            number: next
        })
    }

    const previousPage = () => {
        const previous = page.number - 1;
        if (previous < 0) {
            return;
        }
        setPage({
            ...page,
            number: previous
        })
    }

    const remove = (id: number): void => {
        const deleteUrl = `/user/${id}`;

        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('tokenData')}`
            }
        }

        axios.delete(deleteUrl, config).then((response) => {
            if (response.status === 200) {
                getUsers();
            }
        }).catch(error => alert("Error " + error));

    }

    return (
        <div>
            <div style={{ height: '80%' }}>
                {
                    page.items.map(item => {
                        return (
                            <div>
                                <h1>{item.id}</h1>
                                <h2>{item.email}</h2>
                                <button onClick={() => remove(item.id)}>Удалить</button>
                            </div>
                        )
                    })
                }
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                height: '20%'
            }}>
                <p>Всего {page.totalCount}</p>
                <p>Всего страниц {page.totalPages}</p>
                <p>Текущая страница {page.number}</p>
                <p>На странице {page.size} элементов</p>
                <input type={'button'} value={"Следущая"} onClick={nextPage} />
                <input type={'button'} value={"Предыдущая"} onClick={previousPage} />
            </div>
        </div>
    )
}