import { createInjector, inject, mergeProps } from "unstateless";
import {SubProductsEditorComponent} from "./SubProductsEditor.component";
import {ISubProductsEditorInputProps, SubProductsEditorProps, ISubProductsEditorProps} from "./SubProductsEditor.d";
import { IProduct } from "@store-shared/product/types";
import { useLoaderAsync } from "@core/lib/useLoader";
import { useEffect, useState } from "react";
import { services } from "@core/lib/api";

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

export const SubProductsEditor = connect(SubProductsEditorComponent);
