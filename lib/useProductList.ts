import { services } from "@core/lib/api";
import { flash } from "@core/lib/flash";
import { useLoaderAsync } from "@core/lib/useLoader";
import { appendTo } from "@core/lib/util";
import { IProduct } from "@store-shared/product/types";
import { useState } from "react";
import { all } from "ts-functional";

export const useProductList = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const loader =  useLoaderAsync();

    const product = services().product;

    const create = (onCreate?:(productId:string) => void) => {
        loader(async () => {
            product.create({name: 'New Product', description: 'New Description'})
                .then(appendTo(products))
                .then(() => {
                    flash.success("Product created");
                    if(onCreate) {
                        onCreate(products[products.length - 1].id);
                    } else {
                        refresh();
                    }
                })
                .catch(flash.error("Failed to create product"));
        });
    }
    
    const refresh = () => {
        loader(async () => {
            product.search()
                .then(setProducts)
                .catch(flash.error("Failed to load products"));
        });
    }

    const remove = (id:string) => () => {
        const oldProducts = products;
        setProducts(products.filter(p => p.id !== id));
        loader(async () => {
            product.remove(id)
                .catch(all(() => setProducts(oldProducts), flash.error("Failed to remove product")));
        });
    }

    return {
        products,
        create,
        remove,
        refresh,
        isLoading: loader.isLoading,
    }
}