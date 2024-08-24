import { baseApi } from "@/base-api/baseApi";
import { useState } from "react";
import Cookies from 'js-cookie';
import { usePathname } from "next/navigation";

const usePost = (endPoint: string, body: any, authToken?: string): any => {
  const pathname = usePathname();
    const langCurrent = pathname.slice(1,3)|| 'en';
    const headers = {
        Accept: 'application/json',
        Language: langCurrent,
        Token: 'z9abe71334aea8236dwell811077c7cb768f7e816290f1',
        Authorization: authToken ? `Bearer ${authToken}` : ''
    };
    const [data, setData] = useState<any>([]);
    const [fullData, setFullData] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handlePost = () => {
        setSuccessMessage("");
        setErrorMessage("")
        setSuccess(false);
        setLoading(true);
        baseApi
            .post(endPoint, body, { headers: headers })
            .then((res: any) => {
                setSuccess(true);
                setLoading(false);
                setData(res.data?.data);
                setFullData(res.data)
                setSuccessMessage(res.data?.message)
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

    return [data, loading, handlePost, success, successMessage, errorMessage, setData, fullData];
};

export default usePost;
