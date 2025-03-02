import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "antd";
import { QueueProps } from "./Queue.d";
import styles from './Queue.module.scss';
import { ProductEditor } from "../ProductEditor";

export const QueueComponent = ({product, next, prev, tagName, productCount}:QueueProps) => <>
    <div className={styles.queue}>
        <Button type="primary" onClick={prev} disabled={!prev}><FontAwesomeIcon icon={faArrowLeft} /></Button>
        <span className={styles.product}>
            <b>{tagName} Queue</b> ({productCount} Products)<br/>
            {product ? product.name : "No products in queue"}
        </span>
        <Button type="primary" onClick={next} disabled={!next}><FontAwesomeIcon icon={faArrowRight} /></Button>
    </div>
    {product && <ProductEditor productId={product.id} />}
</>;
