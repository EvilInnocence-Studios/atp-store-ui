import { Link } from "react-router";
import { Image } from "../Image";
import { ProductThumbnailProps } from "./ProductThumbnail.d";

export const ProductThumbnailComponent = ({product}:ProductThumbnailProps) =>
    <Link to={`/products/${product.url}`}>
        {(product.thumbnailId) && <Image productId={product.id} imageId={product.thumbnailId} />}
    </Link>;
