import { overridable } from "@core/lib/overridable";
import { Image } from "@store/components/Image";
import { Link } from "react-router";
import { ProductThumbnailProps } from "./ProductThumbnail.d";

export const ProductThumbnailComponent = overridable(({className, css, product, link}:ProductThumbnailProps) => <>
    {css && <style>{css}</style>}
    {link
        ? <Link to={`/product/${product?.name}`}>
            <Image className={className} productId={product?.id || ''} imageId={product?.thumbnailId || ''} />
          </Link>
        : <Image className={className} productId={product?.id || ''} imageId={product?.thumbnailId || ''} />
    }
    <Image className={className} productId={product?.id || ''} imageId={product?.thumbnailId || ''} />
</>);

