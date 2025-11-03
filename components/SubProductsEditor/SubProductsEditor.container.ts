import { services } from "@core/lib/api";
import { overridable } from "@core/lib/overridable";
import { useLoaderAsync } from "@core/lib/useLoader";
import { IProduct } from "@store-shared/product/types";
import { useEffect, useState } from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import { SubProductsEditorComponent } from "./SubProductsEditor.component";
import { ISubProductsEditorInputProps, ISubProductsEditorProps, SubProductsEditorProps } from "./SubProductsEditor.d";

const injectSubProductsEditorProps = createInjector(({productId}:ISubProductsEditorInputProps):ISubProductsEditorProps => {
    const [subProducts, setSubProducts] = useState<IProduct[]>([]);
    const loader = useLoaderAsync();

    const refresh = () => {
        loader(async () => {
            services().product.subProduct.search(productId).then(setSubProducts);
         });
     }

    const add = (subProductId:string) => {
        loader(async () => {
            await services().product.subProduct.create(productId, subProductId).then(refresh);
        });
    }

    const remove = (subProductId:string) => {
        loader(async () => {
            await services().product.subProduct.remove(productId, subProductId).then(refresh);
        });
    }

    useEffect(refresh, [productId]);
    
    return {subProducts, isLoading: loader.isLoading, add, remove};
});

const connect = inject<ISubProductsEditorInputProps, SubProductsEditorProps>(mergeProps(
    injectSubProductsEditorProps,
));

export const SubProductsEditor = overridable<ISubProductsEditorInputProps>(connect(SubProductsEditorComponent));
