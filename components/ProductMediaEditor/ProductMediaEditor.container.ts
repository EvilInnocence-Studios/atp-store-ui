import { createInjector, inject, mergeProps } from "unstateless";
import {ProductMediaEditorComponent} from "./ProductMediaEditor.component";
import {IProductMediaEditorInputProps, ProductMediaEditorProps, IProductMediaEditorProps} from "./ProductMediaEditor.d";
import { services } from "@core/lib/api";
import { useEffect, useState } from "react";
import { useLoader } from "@core/lib/useLoader";
import { flash } from "@core/lib/flash";
import { IProductMedia } from "@store-shared/product/types";

const injectProductMediaEditorProps = createInjector(({product}:IProductMediaEditorInputProps):IProductMediaEditorProps => {
    const [media, setMedia] = useState<IProductMedia[]>([]);
    const loader = useLoader();

    useEffect(() => {
        if(!!product) {
            loader.start();
            services().product.media.search(product.id)
                .then(setMedia)
                .catch(flash.error('Failed to load media'))
                .finally(loader.stop);
        }
    }, [product]);
    
    const upload = (file: File) => {
        console.log(file);
        services().product.media.upload(product.id, file);
    }
    
    return {media, upload, isLoading: loader.isLoading};
});

const connect = inject<IProductMediaEditorInputProps, ProductMediaEditorProps>(mergeProps(
    injectProductMediaEditorProps,
));

export const ProductMediaEditor = connect(ProductMediaEditorComponent);
