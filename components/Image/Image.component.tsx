import clsx from "clsx";
import { imgHost } from "../ProductMediaEditor/ProductMediaEditor.component";
import {ImageProps} from "./Image.d";
import styles from './Image.module.scss';

export const ImageComponent = ({productId, image, isLoading}:ImageProps) =>
    <img
        src={image
            ? `${imgHost(productId)}${image.url}`
            : '/logo.png'
        }
        alt={image?.alt}
        className={clsx([styles.image, isLoading && styles.loading])}
    />;
