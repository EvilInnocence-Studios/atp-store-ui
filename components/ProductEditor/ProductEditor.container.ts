import { services } from "@core/lib/api";
import { flash } from "@core/lib/flash";
import { useLoader } from "@core/lib/useLoader";
import { IProduct } from "@store-shared/product/types";
import { useEffect, useState } from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import { ProductEditorComponent } from "./ProductEditor.component";
import { IProductEditorInputProps, IProductEditorProps, ProductEditorProps } from "./ProductEditor.d";

const injectProductEditorProps = createInjector(({productId}:IProductEditorInputProps):IProductEditorProps => {
    const [product, setProduct] = useState<IProduct>();
    const loader = useLoader();

    const refresh = () => {
        loader.start();
        services().product.get(productId)
            .then(setProduct)
            .catch(flash.error("Failed to load product"))
            .finally(loader.stop);
    };

    useEffect(refresh, [productId]);

    const update = <T>(field:keyof IProduct) => (value?:T) => {
        if(typeof value !== "undefined") {
            loader.start();
            const oldProduct = product;
            (oldProduct as any)[field] = value;
            setProduct({...product, [field]: value} as IProduct);
            services().product.update(productId, {[field]: value})
                .catch(() => {
                    flash.error("Failed to update product")();
                    setProduct(oldProduct);
                })
                .finally(loader.stop);
        }
    }
    
    return {
        product, isLoading: loader.isLoading,
        updateString: update<string>,
        updateToggle: update<boolean>,
        updateNumber: update<number>
    };
});

const connect = inject<IProductEditorInputProps, ProductEditorProps>(mergeProps(
    injectProductEditorProps,
));

export const ProductEditor = connect(ProductEditorComponent);
