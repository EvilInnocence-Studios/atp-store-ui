import { Scroller } from "@core/components/Scroller";
import { IProductFull } from "@store-shared/product/types";
import { Spin } from "antd";
import { prop } from "ts-functional";
import { ProductListItem } from "../ProductListItem";
import { ProductScrollerProps } from "./ProductScroller.d";
import { overridable } from "@core/lib/overridable";

const ListItem = (hideCartButton?: boolean) => (({ item }: { item: IProductFull }) => <ProductListItem product={item} textSize="small" hideTags hideCartButton={hideCartButton} />);

export const ProductScrollerComponent = overridable(({ title, products, isLoading, hideCartButton, className }: ProductScrollerProps) =>
    <Spin spinning={isLoading}>
        <Scroller
            items={products}
            title={title}
            getId={prop<any, any>("id")}
            Component={ListItem(hideCartButton)}
            className={className}
        />
    </Spin>
);
