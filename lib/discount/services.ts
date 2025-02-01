import { services } from "@core/lib/api";
import { IMethods } from "@core/lib/types";
import { useLoaderAsync } from "@core/lib/useLoader";
import { getResults } from "@core/lib/util";
import { IDiscount, NewDiscount } from "@store-shared/discount/types";
import { useEffect, useState } from "react";
import { memoizePromise } from "ts-functional";

export const discountServices = ({get, post, patch, remove}:IMethods) => ({
    discount: {
        search: memoizePromise(():Promise<IDiscount[]> => get('discount').then(getResults<IDiscount>)),
        get: (id:number) => get(`discount/${id}`).then(getResults<IDiscount>),
        create: (discount:Partial<NewDiscount>) => post('discount', discount).then(getResults<IDiscount>),
        update: (id:number, discount:Partial<IDiscount>) => patch(`discount/${id}`, discount).then(getResults<IDiscount>),
        remove: (id:number) => remove(`discount/${id}`),
    },
});

export const useDiscounts = ():[IDiscount[], boolean] => {
    const [discounts, setDiscounts] = useState<IDiscount[]>([]);
    const loader = useLoaderAsync();

    useEffect(() => {
        loader(async () => {
            services().discount.search().then(setDiscounts);
        })
    }, []);

    return [discounts, loader.isLoading];
}
