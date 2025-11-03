import { Scroller } from "@core/components/Scroller";
import { IProductFull } from "@store-shared/product/types";
import { Spin } from "antd";
import { prop } from "ts-functional";
import { ProductListItem } from "../ProductListItem";
import { ProductScrollerProps } from "./ProductScroller.d";

const ListItem = (({item}:{item: IProductFull}) => <ProductListItem product={item} textSize="small" hideTags />);

export const ProductScrollerComponent = ({title, products, isLoading}:ProductScrollerProps) =>
    <Spin spinning={isLoading}>
        <Scroller
            items={products}
            title={title}
            getId={prop<any, any>("id")}
            Component={ListItem}
        />
    </Spin>;
