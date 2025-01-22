import { Col, Input, Row, Spin } from "antd";
import {UserFileListProps} from "./UserFileList.d";
import styles from './UserFileList.module.scss';
import { ProductFileDownloadBtn } from "../ProductFileDownloadBtn";
import { onInputChange } from "@core/lib/onInputChange";

export const UserFileListComponent = ({user, files, isLoading, q, setQ}:UserFileListProps) =>
    <Spin spinning={isLoading}>
        <Row>
            <Col xs={12}>
                <h1>Files for {user.firstName} {user.lastName}</h1>
            </Col>
            <Col xs={12}>
                <Input.Search placeholder="Search files" value={q} onChange={onInputChange(setQ)} />
            </Col>
        </Row>
        
        <div className={styles.userFileList}>
            {files.map(file => <ProductFileDownloadBtn file={file} />)}
        </div>
    </Spin>;
