import { useImage } from "@store/lib/caching";
import { createInjector, inject, mergeProps } from "unstateless";
import { ImageComponent } from "./Image.component";
import { IImageInputProps, IImageProps, ImageProps } from "./Image.d";
import { useImageHost } from "../ProductMediaEditor/ProductMediaEditor.component";

const injectImageProps = createInjector(({productId, imageId}:IImageInputProps):IImageProps => {
    const [image, isLoading] = useImage(productId, imageId);
    const imgHost = useImageHost(productId);

    return {image, isLoading, imgHost};
});

const connect = inject<IImageInputProps, ImageProps>(mergeProps(
    injectImageProps,
));

export const Image = connect(ImageComponent);
