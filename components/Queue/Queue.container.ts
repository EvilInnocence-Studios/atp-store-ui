import { services } from "@core/lib/api";
import { useLoaderAsync } from "@core/lib/useLoader";
import { IProductFull } from "@store-shared/product/types";
import { useEffect, useState } from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import { QueueComponent } from "./Queue.component";
import { IQueueInputProps, IQueueProps, QueueProps } from "./Queue.d";

const injectQueueProps = createInjector(({tagName}:IQueueInputProps):IQueueProps => {
    const [offset, setOffset] = useState(0);
    const [products, setProducts] = useState<IProductFull[]>([]);
    const loader = useLoaderAsync();

    const refresh = () => {
        setOffset(0);
        loader(() =>
            services().product.search()
            .then(products => products.filter(p => p.tags.includes(tagName)))
            .then(setProducts)
        )
    }

    useEffect(refresh, [tagName]);

    const next = offset < products.length - 1 ? () => {
        setOffset(offset + 1);
    } : undefined;

    const prev = offset > 0 ? () => {
        setOffset(offset - 1);
    } : undefined;
    
    return {product: products[offset], next, prev, refresh, tagName, productCount: products.length};
});

const connect = inject<IQueueInputProps, QueueProps>(mergeProps(
    injectQueueProps,
));

export const Queue = connect(QueueComponent);
