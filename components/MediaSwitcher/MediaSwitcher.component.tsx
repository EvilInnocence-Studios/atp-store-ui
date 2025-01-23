import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Image } from "../Image";
import {MediaSwitcherProps} from "./MediaSwitcher.d";
import styles from './MediaSwitcher.module.scss';
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";

export const MediaSwitcherComponent = ({productId, media, curImage, next, prev}:MediaSwitcherProps) =>
    <div className={styles.mediaSwitcher}>
        <FontAwesomeIcon className={clsx([styles.navBtn, styles.prev])} icon={faCaretLeft } onClick={prev} />
        <FontAwesomeIcon className={clsx([styles.navBtn, styles.next])} icon={faCaretRight} onClick={next} />
        {media.length > 0 && <Image key={media[curImage].id} productId={productId} imageId={media[curImage].id} />}
        <div className={styles.preload}>
            {media.map(image => <Image key={image.id} productId={productId} imageId={image.id} />)}
        </div>
    </div>;
