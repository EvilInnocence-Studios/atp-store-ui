import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Spin } from "antd";
import { Image } from "../Image";
import { MiniProductProps } from "./MiniProduct.d";
import styles from './MiniProduct.module.scss';

export const MiniProductComponent = ({product, isLoading, onRemove}:MiniProductProps) => <div className={styles.miniProduct}>
    <Spin spinning={isLoading}>
        {!!product && <>
            {onRemove && <Button danger type="link" size="small" onClick={() => onRemove(product.id)}>
                <FontAwesomeIcon icon={faRemove} />
            </Button>}
            <Image productId={product.id} imageId={product.thumbnailId} />
            {product.name}<br/>{product.sku}<br/>
            <div style={{clear: "both"}} />
        </>}
    </Spin>
</div>;
