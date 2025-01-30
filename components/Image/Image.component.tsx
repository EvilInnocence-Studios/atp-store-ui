import clsx from "clsx";
import { imgHost } from "../ProductMediaEditor/ProductMediaEditor.component";
import {ImageProps} from "./Image.d";
import styles from './Image.module.scss';
import { Spin } from "antd";

export const ImageComponent = ({productId, image, isLoading}:ImageProps) => <Spin spinning={isLoading}>
    <img
        src={image
            ? `${imgHost(productId)}${image.url}`
            : '/logo.png'
        }
        alt={image?.alt}
        className={clsx([styles.image, isLoading && styles.isLoading])}
    />
</Spin>;
