import { useSetting } from "@common/lib/setting/services";
import { DeleteBtn } from "@core/components/DeleteBtn";
import { SortableList } from "@core/components/SortableList";
import { handle } from "@core/lib/onInputChange";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IProduct, IProductMedia } from "@store-shared/product/types";
import { Button, Space, Spin, Upload } from "antd";
import { prop, sort } from "ts-functional";
import { Image } from "../Image";
import { ProductMediaEditorProps } from "./ProductMediaEditor.d";
import styles from './ProductMediaEditor.module.scss';
import { overridable } from "@core/lib/overridable";

export const useImageHost = (id:string) => {
    const imgHost = useSetting("imageHost");
    const imgFolder = useSetting("productImageFolder");
    return `${imgHost}/${imgFolder}/${id}/`;
}

interface IItemProps {
    item: IProductMedia,
    product: IProduct;
    updateThumbnail: (id:string) => void;
    updateMainImage: (id:string) => void;
    remove: (id:string) => () => void;
}

export const ImageItem = overridable(({item:m, product, updateThumbnail, updateMainImage, remove}:IItemProps) => <div className={styles.mediaItem}>
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
</div>);

export const ProductMediaEditorComponent = overridable(({
    product, media, upload, isLoading,
    updateThumbnail, updateMainImage, remove, sort:sortMedia,
}:ProductMediaEditorProps) =>
    <Spin spinning={isLoading}>
        {!!product && <>
            <div className={styles.productMediaList}>
                <SortableList
                    items={media.sort(sort.by(prop<any, any>("order")).asc)}
                    direction="horizontal"
                    getId={prop("id")}
                    getListId={(image, index) => `${image.id}:${index}`}
                    sort={sortMedia}
                    ItemComponent={ImageItem}
                    itemProps={{product, updateThumbnail, updateMainImage, remove}}
                />
            </div>
            <Upload.Dragger
                customRequest={({file}) => upload(file as File)}
                showUploadList={false}
            >
                <FontAwesomeIcon icon={faUpload} size="3x"/><br/>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
            </Upload.Dragger>
        </>}
    </Spin>
);
