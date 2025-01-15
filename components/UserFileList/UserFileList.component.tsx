import { Spin } from "antd";
import {UserFileListProps} from "./UserFileList.d";
import styles from './UserFileList.module.scss';
import { ProductFileDownloadBtn } from "../ProductFileDownloadBtn";

export const UserFileListComponent = ({user, files, isLoading}:UserFileListProps) =>
    <Spin spinning={isLoading}>
        <h1>Files for {user.firstName} {user.lastName}</h1>
        <div className={styles.userFileList}>
            {files.map(file => <ProductFileDownloadBtn file={file} />)}
        </div>
    </Spin>;
