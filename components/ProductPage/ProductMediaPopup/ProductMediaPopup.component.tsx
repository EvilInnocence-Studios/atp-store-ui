import { MediaPopup } from "@core/components/MediaPopup";
import { overridable } from "@core/lib/overridable";
import { IProductMedia } from "@store-shared/product/types";
import { Image } from "@store/components/Image";
import { prop } from "ts-functional";
import { ProductMediaPopupProps } from "./ProductMediaPopup.d";

export const ProductMediaPopupComponent = overridable(({className, css, media, product}:ProductMediaPopupProps) => <>
    {css && <style>{css}</style>}
    <MediaPopup
        className={className}
        media={media}
        getId={prop<any, any>('id')}
        render={(item: IProductMedia) => <Image productId={product?.id || ""} imageId={item.id} />}
    />
</>);

