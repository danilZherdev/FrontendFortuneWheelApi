import React, { FormEvent, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { editModel } from '../../utils/ModelUtils';
import { PrizeType } from '../../enum/PrizeType';
import PrizeModel from '../../dto/model/PrizeModel';

const PrizeForm: React.FC<{ prizeId: number }> = (props: { prizeId: number }) => {

    const actionUrl = "/prize";

    const [model, setModel] = useState<PrizeModel>({
        id: props.prizeId,
        title: "",
        description: "",
        url: "",
        prizeType: PrizeType.COMFORTING,
    });

    const action = (e: FormEvent) => {
        e.preventDefault();

        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('tokenData')}`
            }
        }

        const request = props.prizeId ?
            axios.put(actionUrl, model, config) : axios.post(actionUrl, model, config);

        request.then(response => {
            console.log("Response ", response)
            alert("Status is " + response.status)
        }).catch(error => {
            console.log("Response ", error)
            alert("ERROR " + error);
        }).finally(() => {
            alert("FINISHED");
        })
    }

    const changeHandler = (e: React.ChangeEvent<HTMLElement>): void => {
        const result = editModel(e, model);
        setModel(result);
    }

    return (
        <form style={{
            display: 'flex',
            flexDirection: 'column'
        }} onSubmit={action}>
            <label>Укажите заголовок приза</label>
            <input type={'text'} name={"title"} value={model.title} onChange={changeHandler} />
            <br />
            <label>Укажите описание приза</label>
            <input type={'text'} name={"description"} value={model.description} onChange={changeHandler} />
            <br />
            <label>Укажите ссылку на изображение</label>
            <input type={'text'} name={"url"} value={model.url} onChange={changeHandler} />
            <br />
            <label>Укажите тип приза</label>
            <select name='prizeType' onChange={changeHandler}>
                <option value={PrizeType.COMFORTING}>Утешительный</option>
                <option value={PrizeType.SUPER}>Супер приз</option>
            </select>
            <br />
            <input type={'submit'} value={'Создать'} />
        </form>
    )
}

export default PrizeForm;