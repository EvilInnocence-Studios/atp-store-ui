import { faArrowLeft, faArrowRight, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Spin } from "antd";
import { QueueProps } from "./Queue.d";
import styles from './Queue.module.scss';
import { ProductEditor } from "../ProductEditor";

export const QueueComponent = ({product, next, prev, done, tag, productCount, isLoading}:QueueProps) => <>
    <Spin spinning={isLoading}>
        <div className={styles.queue}>
            <Button onClick={prev} disabled={!prev}><FontAwesomeIcon icon={faArrowLeft} /></Button>
                <span className={styles.product}>
                    <b>{tag?.name} Queue</b> ({productCount} Products)<br/>
                    {product ? product.name : "No products in queue"}
                </span>
            <Button type="primary" onClick={done} disabled={!product}><FontAwesomeIcon icon={faCheck} /></Button>
            &nbsp;
            <Button onClick={next} disabled={!next}><FontAwesomeIcon icon={faArrowRight} /></Button>
        </div>
    </Spin>
    {product && <ProductEditor productId={product.id} />}
</>;
