import { DeleteBtn } from "@core/components/DeleteBtn";
import { handle } from "@core/lib/onInputChange";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Space, Spin, Upload } from "antd";
import { ProductMediaEditorProps } from "./ProductMediaEditor.d";
import styles from './ProductMediaEditor.module.scss';
import { Image } from "../Image";
import { useSetting } from "@common/lib/setting/services";

export const useImageHost = (id:string) => {
    const imgHost = useSetting("imageHost");
    const imgFolder = useSetting("productImageFolder");
    return `${imgHost}/${imgFolder}/${id}/`;
}

export const ProductMediaEditorComponent = ({
    product, media, upload, isLoading,
    updateThumbnail, updateMainImage, remove
}:ProductMediaEditorProps) =>
    <Spin spinning={isLoading}>
        {!!product && <>
            <div className={styles.productMediaList}>
                {media.map(m => <div className={styles.mediaItem}>
                    <Image productId={product.id} imageId={m.id} /><br/>
                    <Space.Compact>
                        <Button
                            type={m.id === product.thumbnailId ? "primary" : "default"} 
                            onClick={handle(updateThumbnail)(m.id)}
                        >
                            Thumbnail
                        </Button>
                        <Button
                            type={m.id === product.mainImageId ? "primary" : "default"}
                            onClick={handle(updateMainImage)(m.id)}
                        >
                            Main Image
                        </Button>
                    </Space.Compact>
                    <DeleteBtn entityType="image" onClick={remove(m.id)} />
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
