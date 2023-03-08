import React, { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import SpinData from '../../dto/data/SpinData';
import Page from '../../dto/Page';


const SpinList = () => {
    const defaultPageSize = 100

    const [data, setData] = useState<Page<SpinData>>({
        number: 0,
        size: defaultPageSize,
        totalCount: 0,
        totalPages: 0,
        items: []
    })

    const listUrl = `/spin/all/${data.number}/${defaultPageSize}`;

    useEffect(() => {
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('tokenData')}`
            }
        };

        axios.get(listUrl, config).then(response => {
            if (response.status === 200) {
                const result = response.data as Page<SpinData>;
                setData(result);
            }
        }).catch(error => {
            alert("Error = " + error);
        })
    }, [listUrl]);

    return(
        <div>
            {
                data.items.map(item =>{
                    return(
                        <div>
                            <p>{item.hash}</p>
                            <p>{item.status}</p>
                            <p>{item.user.email}</p>
                            <p>{item.user.id}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SpinList;