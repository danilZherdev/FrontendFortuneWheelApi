import React, { useEffect,useState } from 'react';
import SpinPrizeData from '../../dto/data/SpinPrizeData';
import Page from '../../dto/Page';
import axios, { AxiosRequestConfig } from 'axios';
 
const SpinPrizeList = () => {
    const defaultPageSize = 1;

    const [data, setData] = useState<Page<SpinPrizeData>>({
        number: 0,
        size: defaultPageSize,
        totalCount: 0,
        totalPages: 0,
        items: []
    });

    const listUrl = `/spin-prize/all/${data.number}/${defaultPageSize}`;

    useEffect(() => {
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('tokenData')}`
            }
        };
        axios.get(listUrl, config).then(response => {
            if(response.status === 200) {
                const result = response.data as Page<SpinPrizeData>;
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
                    return(
                        <div>
                            <p>{item.given}</p>
                            <p>{item.spin.hash}</p>
                            <p>{item.spin.status}</p>
                            <p>{item.spin.user.email}</p>
                            <p>{item.spin.user.id}</p>
                            <p>{item.prize.id}</p>
                            <p>{item.prize.title}</p>
                            <p>{item.prize.description}</p>
                            <p>{item.prize.url}</p>
                            <p>{item.prize.prizeType}</p>

                        </div>
                    )
                })
            }
        </div>
    )
}

export default SpinPrizeList;