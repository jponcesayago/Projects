import { useEffect, useState } from "react";
import { getGifts } from '../helpers/getGifts';

export const useFetchGifts = (category) => {


    const [state, setState] = useState({
        data: [],
        loading: true
    });

    useEffect(() => {
        getGifts(category).then(data => {
            setState({
                data: data,
                loading: false
            });
        });
    }, [category]);


    return state;

}
