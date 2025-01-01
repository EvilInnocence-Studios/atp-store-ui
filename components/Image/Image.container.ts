import { services } from "@core/lib/api";
import { useLoader } from "@core/lib/useLoader";
import { IProductMedia } from "@store-shared/product/types";
import { useEffect, useState } from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import { ImageComponent } from "./Image.component";
import { IImageInputProps, IImageProps, ImageProps } from "./Image.d";

const injectImageProps = createInjector(({productId, imageId}:IImageInputProps):IImageProps => {
    const [image, setImage] = useState<IProductMedia | null>(null);
    const loader = useLoader();

    useEffect(() => {
        if(imageId) {
            loader.start();
            services().product.media.get(productId, imageId)
                .then(setImage)
                .finally(loader.stop);
        }
    }, [productId, imageId]);
    
    return {image, isLoading: loader.isLoading};
});

const connect = inject<IImageInputProps, ImageProps>(mergeProps(
    injectImageProps,
));

export const Image = connect(ImageComponent);
