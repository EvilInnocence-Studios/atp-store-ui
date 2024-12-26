import { Button, Space, Spin, Upload } from "antd";
import {ProductMediaEditorProps} from "./ProductMediaEditor.d";
import styles from './ProductMediaEditor.module.scss';
import { DeleteBtn } from "@core/components/DeleteBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

export const imgHost = (id:number) =>
    // "https:\/\/www.evilinnocence.com\/shop\/media\/catalog\/product";
   `https://evilinnocence.s3.us-east-1.amazonaws.com/media/product/${id}/`;

export const ProductMediaEditorComponent = ({product, media, upload, isLoading}:ProductMediaEditorProps) =>
    <Spin spinning={isLoading}>
        {!!product && <>
            <div className={styles.productMediaList}>
                {media.map(m => <div className={styles.mediaItem}>
                    <img src={`${imgHost(product.id)}${m.url}`} alt={m.caption} width={256}/><br/>
                    <Space.Compact>
                        <Button type={m.id === product.thumbnailId ? "primary" : "default"} onClick={() => console.log('edit', m.id)}>Thumbnail</Button>
                        <Button type={m.id === product.mainImageId ? "primary" : "default"} onClick={() => console.log('edit', m.id)}>Main Image</Button>
                    </Space.Compact>
                    <DeleteBtn entityType="image" onClick={() => console.log('delete', m.id)} />
                </div>)}
            </div>
            <Upload.Dragger
                customRequest={({file}) => upload(file as File)}
                showUploadList={false}
            >
                <FontAwesomeIcon icon={faUpload} size="3x"/><br/>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
            </Upload.Dragger>
        </>}
    </Spin>;
