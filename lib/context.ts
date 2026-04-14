import { ITag } from "@common-shared/tag/types";
import { services } from "@core/lib/api";
import { useLoaderAsync } from "@core/lib/useLoader";
import { IProduct, IProductFull, IProductMedia } from "@store-shared/product/types";
import { createContext, useContext, useEffect, useState } from "react";
import { memoizePromise, prop, sort } from "ts-functional";
import { createInjector } from "unstateless";

export interface IProductContextProps {
    product: IProductFull | null;
    tags: ITag[];
    media: IProductMedia[];
    relatedProducts: IProduct[];
    subProducts: IProduct[];
    isLoading: boolean;
}

export const ProductIdContext = createContext<string>("");

const loadProduct = memoizePromise((id: string):Promise<IProductFull> => services().product.get(id));
const loadTags = memoizePromise((id: string):Promise<ITag[]> => services().product.tag.search(id));
const loadMedia = memoizePromise((id: string):Promise<IProductMedia[]> => services().product.media.search(id));
const loadRelatedProducts = memoizePromise((id: string):Promise<IProduct[]> => services().product.related.search(id));
const loadSubProducts = memoizePromise((id: string):Promise<IProduct[]> => services().product.subProduct.search(id));

export const injectProductContextProps = createInjector(({id}: {id?:string | null}):IProductContextProps => {
    const [product, setProduct] = useState<IProductFull | null>(null);
    const [tags, setTags] = useState<ITag[]>([]);
    const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);
    const [media, setMedia] = useState<IProductMedia[]>([]);
    const [subProducts, setSubProducts] = useState<IProduct[]>([]);
    const loader = useLoaderAsync();

    const defaultId = useContext(ProductIdContext);
    const thisId = id || defaultId;

    useEffect(() => {
        if (!thisId) return;

        loader(() => loadProduct(thisId).then(setProduct));

        // Load tags
        loader(() => loadTags(thisId).then(setTags));

        // Load media
        loader(() => loadMedia(thisId).then(media => setMedia(media.sort(sort.by(prop<any, any>("order")).asc))));

        // Load related products
        loader(() => loadRelatedProducts(thisId).then(setRelatedProducts));

        // Load sub products
        loader(() => loadSubProducts(thisId).then(setSubProducts));
    }, [thisId]);
    
    return {product, tags, media, relatedProducts, isLoading: loader.isLoading, subProducts};
});