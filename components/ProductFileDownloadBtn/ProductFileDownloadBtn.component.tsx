import { Button } from "antd";
import {ProductFileDownloadBtnProps} from "./ProductFileDownloadBtn.d";
import styles from './ProductFileDownloadBtn.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";

export const ProductFileDownloadBtnComponent = ({file, download, small}:ProductFileDownloadBtnProps) =>
    <Button size={small ? "small" : undefined} className={clsx([!small && styles.productFileDownloadBtn])} onClick={download} title={file.fileName}>
        <FontAwesomeIcon icon={faDownload} title={file.fileName} />
        {!small && file.fileName}
    </Button>;
