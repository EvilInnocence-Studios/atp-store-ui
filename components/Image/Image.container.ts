import { useImage } from "@store/lib/caching";
import { createInjector, inject, mergeProps } from "unstateless";
import { ImageComponent } from "./Image.component";
import { IImageInputProps, IImageProps, ImageProps } from "./Image.d";

const injectImageProps = createInjector(({productId, imageId}:IImageInputProps):IImageProps => {
    const [image, isLoading] = useImage(productId, imageId);

    return {image, isLoading};
});

const connect = inject<IImageInputProps, ImageProps>(mergeProps(
    injectImageProps,
));

export const Image = connect(ImageComponent);
