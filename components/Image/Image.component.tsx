import { Spin } from "antd";
import clsx from "clsx";
import { ImageProps } from "./Image.d";
import styles from './Image.module.scss';
import { overridable } from "@core/lib/overridable";

export const ImageComponent = overridable(({image, isLoading, imgHost}:ImageProps) => <Spin spinning={isLoading}>
    <img
        src={image && imgHost
            ? `${imgHost}${image.url}`
            : '/logo.png'
        }
        alt={image?.alt}
        className={clsx([styles.image, isLoading && styles.isLoading])}
    />
</Spin>);
