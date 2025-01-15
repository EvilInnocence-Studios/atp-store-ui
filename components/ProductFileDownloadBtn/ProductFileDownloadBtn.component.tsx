import { Button } from "antd";
import {ProductFileDownloadBtnProps} from "./ProductFileDownloadBtn.d";
import styles from './ProductFileDownloadBtn.module.scss';

export const ProductFileDownloadBtnComponent = ({file, download}:ProductFileDownloadBtnProps) =>
    <Button className={styles.productFileDownloadBtn} onClick={download}>
        {file.fileName}
    </Button>;
