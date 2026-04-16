import { overridable } from "@core/lib/overridable";
import { Image } from "@store/components/Image";
import { ProductThumbnailProps } from "./ProductThumbnail.d";

export const ProductThumbnailComponent = overridable(({className, css, product}:ProductThumbnailProps) => <>
    {css && <style>{css}</style>}
    <Image className={className} productId={product?.id || ''} imageId={product?.thumbnailId || ''} />
</>);

