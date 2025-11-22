import { Spin } from "antd";
import { IPlacedProduct, ProductListProps } from "./ProductList.d";
import { arrangeProducts, groupProducts } from "./ProductList.helpers";
import styles from './ProductList.module.scss';
import { useScreenSize } from "@core/lib/useScreenSize";
import { overridable } from "@core/lib/overridable";

export const ProductListComponent = overridable(({ products, isLoading, classes = styles }: ProductListProps) => {
    const { width } = useScreenSize();
    const gutterSize = 24;
    const columnCount =
        width > 768 ? 8 :
            width > 512 ? 4 :
                2;
    const margin = 48;
    const imageSize = (width - gutterSize * (columnCount - 1) - margin) / columnCount;

    const groupedProducts = groupProducts(products, { x: columnCount, y: 3000 });

    const arrangedProducts = arrangeProducts(groupedProducts);

    const galleryHeight = arrangedProducts.reduce((max, product) => Math.max(max, product.origin.y + product.size.y), 0) * (imageSize + 16);

    return <Spin spinning={isLoading}>
        <div className={classes.gallery} style={{ height: galleryHeight }}>
            {arrangedProducts.map((product: IPlacedProduct, i: number) => <img
                key={i}
                src={`${product.thumbnailUrl}`}
                alt={product.name}
                style={{
                    top: `${product.origin.y * (imageSize + gutterSize)}px`,
                    left: `${product.origin.x * (imageSize + gutterSize)}px`,
                    width: `${product.size.x * imageSize + gutterSize * (product.size.x - 1)}px`,
                    height: `${product.size.y * imageSize + gutterSize * (product.size.y - 1)}px`,
                }}
            />)}
        </div>
    </Spin>;
});
