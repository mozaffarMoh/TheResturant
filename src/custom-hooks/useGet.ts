import { baseApi } from "@/base-api/baseApi";
import { useState } from "react";
import Cookies from 'js-cookie';

const useGet = (endPoint: string): any => {
    const langCookie = Cookies.get('NEXT_LOCALE') || 'en';
    const headers = {
        Accept: 'application/json',
        Language: langCookie,
        Token: 'z9abe71334aea8236dwell811077c7cb768f7e816290f1',
    };
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const getData = () => {
        setSuccessMessage("");
        setErrorMessage("")
        setSuccess(false);
        setLoading(true);
        baseApi
            .get(endPoint, { headers: headers })
            .then((res: any) => {
                setSuccess(true);
                setLoading(false);
                setData(res.data?.data);
                setTimeout(() => {
                    setSuccessMessage("")
                }, 3000);
            })
            .catch((err: any) => {
                setLoading(false);

                setErrorMessage(err.response?.data?.message)
                setTimeout(() => {
                    setErrorMessage("")
                }, 3000);
            })
    };

    return [data, loading, getData, success, successMessage, errorMessage, setData];
};

export default useGet;
