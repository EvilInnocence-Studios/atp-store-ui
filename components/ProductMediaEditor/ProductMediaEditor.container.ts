import { services } from "@core/lib/api";
import { flash } from "@core/lib/flash";
import { useLoaderAsync } from "@core/lib/useLoader";
import { IProductMedia } from "@store-shared/product/types";
import { useEffect, useState } from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import { ProductMediaEditorComponent } from "./ProductMediaEditor.component";
import { IProductMediaEditorInputProps, IProductMediaEditorProps, ProductMediaEditorProps } from "./ProductMediaEditor.d";

const injectProductMediaEditorProps = createInjector(({product, update}:IProductMediaEditorInputProps):IProductMediaEditorProps => {
    const [media, setMedia] = useState<IProductMedia[]>([]);
    const loader = useLoaderAsync();

    const refresh = () => {
        if(!!product) {
            loader(() => services().product.media.search(product.id)
                .then(setMedia)
                .catch(flash.error('Failed to load media'))
            );
        }
    }

    useEffect(refresh, [product]);
    
    const upload = (file: File) => {
        loader(() => services().product.media.upload(product.id, file)
            .then(flash.success("Image uploaded"))
            .then(refresh)
            .catch(flash.error("Failed to upload image"))
        );
    }

    const remove = (id:string) => () => {
        loader(() => services().product.media.remove(product.id, id)
            .then(flash.success("Image removed"))
            .then(() => {
                setMedia(old => old.filter(m => m.id !== id))
            })
            .catch(flash.error("Failed to remove image"))
        );
    }

    const updateThumbnail = update("thumbnailId");
    const updateMainImage = update("mainImageId");
    
    return {media, upload, isLoading: loader.isLoading, updateThumbnail, updateMainImage, remove};
});

const connect = inject<IProductMediaEditorInputProps, ProductMediaEditorProps>(mergeProps(
    injectProductMediaEditorProps,
));

export const ProductMediaEditor = connect(ProductMediaEditorComponent);
