import { services } from "@core/lib/api";
import { useLoaderAsync } from "@core/lib/useLoader";
import { IProductFull } from "@store-shared/product/types";
import { useEffect, useState } from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import { QueueComponent } from "./Queue.component";
import { IQueueInputProps, IQueueProps, QueueProps } from "./Queue.d";
import { ITag } from "@common-shared/tag/types";

const injectQueueProps = createInjector(({groupId, tagId}:IQueueInputProps):IQueueProps => {
    const [offset, setOffset] = useState(0);
    const [products, setProducts] = useState<IProductFull[]>([]);
    const [tag, setTag] = useState<ITag | null>(null);
    const loader = useLoaderAsync();

    const refresh = (keepOffset?: boolean) => {
        if(!keepOffset) {
            setOffset(0);
        }
        loader(() => Promise.all([
            services().tagGroup.tag.get(groupId, tagId),
            services().product.search()
        ]).then(([tag, products]) => {
            setTag(tag);
            setProducts(products.filter(p => p.tags.includes(tag.name)));
        }));
    }

    useEffect(refresh, [tagId, groupId]);

    const done = () => {
        const id = products[offset].id;
        loader(() => 
            services().product.tag.remove(id, tagId)
                .then(() => {
                    setProducts(products.filter(p => p.id !== id));
                })
        );
    }

    const next = offset < products.length - 1 ? () => {
        setOffset(offset + 1);
    } : undefined;

    const prev = offset > 0 ? () => {
        setOffset(offset - 1);
    } : undefined;
    
    return {product: products[offset], next, prev, refresh, tag, productCount: products.length, done, isLoading: loader.isLoading};
});

const connect = inject<IQueueInputProps, QueueProps>(mergeProps(
    injectQueueProps,
));

export const Queue = connect(QueueComponent);
