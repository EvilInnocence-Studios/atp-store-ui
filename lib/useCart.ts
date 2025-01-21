import { IProduct } from "@store-shared/product/types";
import { useLocalStorage } from "unstateless";

export declare interface ICart {
    products: IProduct[];
    add: (product: IProduct) => void;
    remove: (product: IProduct) => void;
    clear: () => void;
    couponCode: string;
    setCouponCode: (couponCode: string) => void;
    subTotal: () => number;
    total: () => number;
}

export const useCart = () => {
    const [products, setProducts] = useLocalStorage.object<IProduct[]>("cartProducts", [])();
    const [couponCode, setCouponCode] = useLocalStorage.string("cartCouponCode", "")();

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

    const subTotal = () => {
        return products.reduce((acc, product) => acc + product.price, 0);
    }

    const total = () => {
        // TODO: Add discounts
        return subTotal();
    }

    return {
        products,
        add,
        remove,
        clear,
        couponCode,
        setCouponCode,
        subTotal,
        total,
    }
}
