import { Image } from "../Image";
import {MiniProductProps} from "./MiniProduct.d";
import styles from './MiniProduct.module.scss';

export const MiniProductComponent = ({product}:MiniProductProps) => <div className={styles.miniProduct}>
    <Image productId={product.id} imageId={product.thumbnailId} />
    {product.name}<br/>{product.sku}
    <div style={{clear: "both"}} />
</div>;
