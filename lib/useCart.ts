import { services } from "@core/lib/api";
import { useLoaderAsync } from "@core/lib/useLoader";
import { ICartTotals } from "@store-shared/order/types";
import { IProduct } from "@store-shared/product/types";
import { useLoggedInUser } from "@uac/lib/login/services";
import { useEffect, useState } from "react";
import { useLocalStorage } from "unstateless";

export declare interface ICart {
    products: IProduct[];
    add: (product: IProduct) => void;
    remove: (product: IProduct) => void;
    clear: () => void;
    couponCode: string;
    setCouponCode: (couponCode: string) => void;
    totals: ICartTotals;
    isLoading: boolean;
}

const useCouponCodeRaw = useLocalStorage.string<string>("cartCouponCode", "");

export const useCart = ():ICart => {
    const [products, setProducts] = useLocalStorage.object<IProduct[]>("cartProducts", [])();
    const [couponCode, setCouponCode] = useCouponCodeRaw();
    const [totals, setTotals] = useState<ICartTotals>({subtotal: 0, total: 0, discount: 0});
    const loader = useLoaderAsync();
    const [user] = useLoggedInUser();

    useEffect(() => {
        loader(async () => {
            services().cart(user.user.id, products.map(p => p.id), couponCode).then(setTotals);
        });
    }, [user.user.id, products, couponCode]);

    const removeProduct = (product: IProduct) => products.filter(p => p.id !== product.id);

    const add = (product: IProduct) => {
        setProducts([...removeProduct(product), product]);
    }

    const remove = (product: IProduct) => {
        setProducts(removeProduct(product));
    }

    const clear = () => {
        setProducts([]);
    }

    return {
        products,
        add,
        remove,
        clear,
        couponCode,
        setCouponCode,
        totals,
        isLoading: loader.isLoading,
    }
}
