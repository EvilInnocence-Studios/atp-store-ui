import { MediaSwitcher } from "@core/components/MediaSwitcher";
import { overridable } from "@core/lib/overridable";
import { Image } from "@store/components/Image";
import { prop } from "ts-functional";
import { ProductMediaProps } from "./ProductMedia.d";

export const ProductMediaComponent = overridable(({product, media, className, css}:ProductMediaProps) => <>
    {css && <style>{css}</style>}
    <div className={className}>
        {product && <MediaSwitcher
            media={media.filter(item => item.id !== product.thumbnailId || item.id === product.mainImageId)}
            defaultMediaId={product.mainImageId}
            render={image => <Image key={image.id} productId={product.id} imageId={image.id} />}
            getId={prop('id')}
        />}
    </div>
</>);

