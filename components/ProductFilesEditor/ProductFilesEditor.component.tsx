import { Col, Input, Row, Spin, Upload } from "antd";
import {ProductFilesEditorProps} from "./ProductFilesEditor.d";
import styles from './ProductFilesEditor.module.scss';
import { onInputChange } from "@core/lib/onInputChange";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { DeleteBtn } from "@core/components/DeleteBtn";

export const ProductFilesEditorComponent = ({files, isLoading, folder, setFolder, add, remove, download}:ProductFilesEditorProps) =>
    <Spin spinning={isLoading}>
        <Row gutter={32} className={styles.productFilesEditor}>
            <Col xs={6} className={styles.folder}>
                <h2>Add new downloadable file</h2>
                <Input addonBefore="Folder" value={folder} onChange={onInputChange(setFolder)} />
                <Upload.Dragger
                    name="file"
                    multiple={false}
                    customRequest={({file}) => add(file as File)}
                    showUploadList={false}
                >
                    <FontAwesomeIcon icon={faUpload} size="3x"/><br/>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                </Upload.Dragger>
            </Col>
            <Col xs={18} className={styles.files}>
                <h2>Existing files</h2>
                {files.map(file =>
                    <div key={file.id} className={styles.file}>
                        <a href="#" onClick={download(file)}>{file.fileName}</a>
                        <DeleteBtn entityType="product file" onClick={remove(file.id)} />
                    </div>
                )}
            </Col>
        </Row>
    </Spin>;
