import { Link } from "react-router";
import { Image } from "../Image";
import { ProductThumbnailProps } from "./ProductThumbnail.d";
import { overridable } from "@core/lib/overridable";

export const ProductThumbnailComponent = overridable(({product}:ProductThumbnailProps) =>
    <Link to={`/products/${product.url}`}>
        {(product.thumbnailId) && <Image productId={product.id} imageId={product.thumbnailId} />}
    </Link>
);
