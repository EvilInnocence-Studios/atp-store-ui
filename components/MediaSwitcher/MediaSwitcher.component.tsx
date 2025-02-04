import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Image } from "../Image";
import {MediaSwitcherProps} from "./MediaSwitcher.d";
import styles from './MediaSwitcher.module.scss';
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";

export const MediaSwitcherComponent = ({productId, media, curImage, next, prev, setCurImage}:MediaSwitcherProps) => <>
    <div className={styles.mediaSwitcher}>
        {media.length > 1 &&<>
            <FontAwesomeIcon className={clsx([styles.navBtn, styles.prev])} icon={faCaretLeft } onClick={prev} />
            <FontAwesomeIcon className={clsx([styles.navBtn, styles.next])} icon={faCaretRight} onClick={next} />
        </>}
        {media.map(image => <div key={image.id} className={clsx([styles.mediaImage, curImage === media.indexOf(image) && styles.active])}>
            <Image key={image.id} productId={productId} imageId={image.id} />
        </div>)}
    </div>
    {media.length > 1 && <div className={styles.thumbs}>
        {media.map(image => <div
            key={image.id}
            className={clsx([styles.thumb, curImage === media.indexOf(image) && styles.active])}
            onClick={() => setCurImage(media.indexOf(image))}
        >
            <Image key={image.id} productId={productId} imageId={image.id} />
        </div>)}
    </div>}
</>;
