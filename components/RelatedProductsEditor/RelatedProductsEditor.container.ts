import { createInjector, inject, mergeProps } from "unstateless";
import {RelatedProductsEditorComponent} from "./RelatedProductsEditor.component";
import {IRelatedProductsEditorInputProps, RelatedProductsEditorProps, IRelatedProductsEditorProps} from "./RelatedProductsEditor.d";
import { useEffect, useState } from "react";
import { IProduct } from "@store-shared/product/types";
import { useLoader } from "@core/lib/useLoader";
import { services } from "@core/lib/api";
import { flash } from "@core/lib/flash";

const injectRelatedProductsEditorProps = createInjector(({productId}:IRelatedProductsEditorInputProps):IRelatedProductsEditorProps => {
    const [related, setRelated] = useState<IProduct[]>([]);
    const loader = useLoader();

    useEffect(refresh, []);

    function refresh() {
        loader.start();
        services().product.related.search(productId)
            .then(setRelated)
            .finally(loader.stop);
    }

    const add = (relatedProductId:string) => {
        if(relatedProductId === productId) {
            flash.error("You can't relate a product to itself");
            return;            
        }
        loader.start();
        services().product.related.create(productId, relatedProductId)
            .then(refresh)
            .finally(loader.stop);
    };

    const remove = (product:IProduct) => () => {
        loader.start();
        services().product.related.remove(productId, product.id)
            .then(refresh)
            .finally(loader.stop);
    };
    
    return {related, add, remove, isLoading: loader.isLoading};
});

const connect = inject<IRelatedProductsEditorInputProps, RelatedProductsEditorProps>(mergeProps(
    injectRelatedProductsEditorProps,
));

export const RelatedProductsEditor = connect(RelatedProductsEditorComponent);
