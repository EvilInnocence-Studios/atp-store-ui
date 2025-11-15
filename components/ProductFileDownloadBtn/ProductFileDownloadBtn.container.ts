import { services } from "@core/lib/api";
import { overridable } from "@core/lib/overridable";
import { useLoaderAsync } from "@core/lib/useLoader";
import { createInjector, inject, mergeProps } from "unstateless";
import { ProductFileDownloadBtnComponent } from "./ProductFileDownloadBtn.component";
import { IProductFileDownloadBtnInputProps, IProductFileDownloadBtnProps, ProductFileDownloadBtnProps } from "./ProductFileDownloadBtn.d";

const injectProductFileDownloadBtnProps = createInjector(({file}:IProductFileDownloadBtnInputProps):IProductFileDownloadBtnProps => {
    const loader = useLoaderAsync();
    
    const download = () => {
        loader(async () => {
            services().product.files.download(file.productId, file.id)
                .then((url:string) => {
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = file.fileName;
                    link.click();
                });
        });
    }

    return {download};
});

const connect = inject<IProductFileDownloadBtnInputProps, ProductFileDownloadBtnProps>(mergeProps(
    injectProductFileDownloadBtnProps,
));
export const connectProductFileDownloadBtn = connect;

export const ProductFileDownloadBtn = overridable<IProductFileDownloadBtnInputProps>(connect(ProductFileDownloadBtnComponent));
