import { Tag } from "antd";
import {ProductPriceProps} from "./ProductPrice.d";
import styles from './ProductPrice.module.scss';

export const ProductPriceComponent = ({product}:ProductPriceProps) =><>{
    product.subscriptionOnly ? <Tag>BSP</Tag>          :
         product.price > 0.0 ? <p>${product.price}</p> :
                               <Tag>Free</Tag>
  }</>;
