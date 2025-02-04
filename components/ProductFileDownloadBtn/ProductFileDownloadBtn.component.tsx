import { Button } from "antd";
import {ProductFileDownloadBtnProps} from "./ProductFileDownloadBtn.d";
import styles from './ProductFileDownloadBtn.module.scss';

// If the name is too long, shorten it to 50 characters and add "..." in the middle
const maxStart = 30;
const maxEnd = 10;
export const shortenName = (name:string) => {
    if (name.length > maxStart + maxEnd + 5) {
        const firstHalf = name.substring(0, maxStart).trim();
        const secondHalf = name.substring(name.length - maxEnd).trim();
        return `${firstHalf} ... ${secondHalf}`;
    }
    return name;
};

export const ProductFileDownloadBtnComponent = ({file, download}:ProductFileDownloadBtnProps) =>
    <Button className={styles.productFileDownloadBtn} onClick={download} title={file.fileName}>
        {shortenName(file.fileName)}
    </Button>;
