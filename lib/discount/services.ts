import { services } from "@core/lib/api";
import { IMethods } from "@core/lib/types";
import { useLoaderAsync } from "@core/lib/useLoader";
import { getResults } from "@core/lib/util";
import { IDiscount, NewDiscount } from "@store-shared/discount/types";
import { useEffect, useState } from "react";
import { memoizePromise } from "ts-functional";

export const discountServices = ({get, post, patch, remove}:IMethods) => ({
    discount: {
        search: ():Promise<IDiscount[]> => get('discount').then(getResults<IDiscount>),
        get: (id:string) => get(`discount/${id}`).then(getResults<IDiscount>),
        create: (discount:Partial<NewDiscount>) => post('discount', discount).then(getResults<IDiscount>),
        update: (id:string, discount:Partial<IDiscount>) => patch(`discount/${id}`, discount).then(getResults<IDiscount>),
        remove: (id:string) => remove(`discount/${id}`),
    },
});

const loadDiscounts = memoizePromise(() => services().discount.search());

export const useDiscounts = ():[IDiscount[], boolean] => {
    const [discounts, setDiscounts] = useState<IDiscount[]>([]);
    const loader = useLoaderAsync();

    useEffect(() => {
        loader(async () => {
            loadDiscounts().then(setDiscounts);
        })
    }, []);

    return [discounts, loader.isLoading];
}
