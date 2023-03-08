import axios, { AxiosRequestConfig } from 'axios';
import React, { useEffect, useState } from 'react';
import PrizeData from '../../dto/data/PrizeData';
import Page from '../../dto/Page';
import { PrizeType } from '../../enum/PrizeType';

const PrizesList = () => {
    const defaultPageSize = 100;

    const [data, setData] = useState<Page<PrizeData>>({
        number: 0,
        size: defaultPageSize,
        totalCount: 0,
        totalPages: 0,
        items: []
    });

    const listUrl = `/prize/all/${data.number}/${defaultPageSize}`;

    useEffect(() => {
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('tokenData')}`
            }
        };

        axios.get(listUrl, config).then(response => {
            if (response.status === 200) {
                const result = response.data as Page<PrizeData>;
                setData(result);
            }
        }).catch(error => {
            alert("Error = " + error);
        })
    }, [listUrl]);


    return (
        <div>
            {
                data.items.map(item => {
                    return (
                        <div>
                            <p>{item.id}</p>
                            <p>{item.title}</p>
                            <p>{item.description}</p>
                            <p>{item.url}</p>
                            <p>{item.prizeType === PrizeType.COMFORTING ? "Утешительный" : "Супер приз"}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default PrizesList;