import { services } from "@core/lib/api";
import { Queue } from "@core/components/Queue";
import {ProductQueueProps} from "./ProductQueue.d";
import { prop } from "ts-functional";
import { IProductFull } from "@store-shared/product/types";
import { ProductEditor } from "../ProductEditor";

export const ProductQueueComponent = ({groupId, tagId}:ProductQueueProps) =>
    <Queue
        groupId={groupId}
        tagId={tagId}
        itemType="products"
        loadItems={services().product.search}
        removeTag={services().product.tag.remove}
        getTags={prop<IProductFull, "tags">("tags")}
        getId={prop<IProductFull, "id">("id")}
        getName={prop<IProductFull, "name">("name")}
        getEditor={(item: IProductFull) => <ProductEditor productId={item.id} />}
    />;
