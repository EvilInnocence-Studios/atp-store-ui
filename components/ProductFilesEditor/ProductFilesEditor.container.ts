import { createInjector, inject, mergeProps } from "unstateless";
import {ProductFilesEditorComponent} from "./ProductFilesEditor.component";
import {IProductFilesEditorInputProps, ProductFilesEditorProps, IProductFilesEditorProps} from "./ProductFilesEditor.d";
import { useEffect, useState } from "react";
import { IProductFile } from "@store-shared/product/types";
import { useLoader } from "@core/lib/useLoader";
import { services } from "@core/lib/api";
import { s3Upload } from "@core/lib/s3Upload";
import { flash } from "@core/lib/flash";

const injectProductFilesEditorProps = createInjector(({productId}:IProductFilesEditorInputProps):IProductFilesEditorProps => {
    const [files, setFiles] = useState<IProductFile[]>([]);
    const loader = useLoader();

    const refresh = () => {
        loader.start();
        services().product.files.search(productId)
            .then(setFiles)
            .finally(loader.stop);
    }

    useEffect(refresh, [productId]);

    const [folder, setFolder] = useState<string>('');
    const add = async (file:File) => {
        loader.start();
        const url = await services().product.files.getUploadUrl(productId, folder, file.name);
        console.log("Upload url", url);
        s3Upload(file, url)
            .then(() => services().product.files.add(productId, folder, file.name))
            .then(() => {
                flash.success("File uploaded successfully");
                refresh();
            })
            .catch(() => {
                flash.error("Failed to upload file. Please try again.");
            })
            .finally(loader.stop);
    }

    const remove = (fileId:string) => () => {
        loader.start();
        services().product.files.remove(productId, fileId)
            .then(refresh)
            .finally(loader.stop);
    }

    const download = (file:IProductFile) => () => {
        loader.start();
        services().product.files.download(productId, file.id)
            .then((url:string) => {
                const link = document.createElement('a');
                link.href = url;
                link.download = file.fileName;
                link.click();
            })
            .finally(loader.stop)
    }
    
    return {files, isLoading: loader.isLoading, add, remove, folder, setFolder, download};
});

const connect = inject<IProductFilesEditorInputProps, ProductFilesEditorProps>(mergeProps(
    injectProductFilesEditorProps,
));

export const ProductFilesEditor = connect(ProductFilesEditorComponent);
