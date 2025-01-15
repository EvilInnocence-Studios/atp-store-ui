import { createInjector, inject, mergeProps } from "unstateless";
import {UserFileListComponent} from "./UserFileList.component";
import {IUserFileListInputProps, UserFileListProps, IUserFileListProps} from "./UserFileList.d";
import { useLoggedInUser } from "@uac/lib/login/services";
import { useEffect, useState } from "react";
import { SafeUser } from "@uac-shared/user/types";
import { IProductFile } from "@store-shared/product/types";
import { useLoaderAsync } from "@core/lib/useLoader";
import { services } from "@core/lib/api";

const injectUserFileListProps = createInjector(({userId}:IUserFileListInputProps):IUserFileListProps => {
    const [loggedInUser] = useLoggedInUser();
    const [user, setUser] = useState<SafeUser>(loggedInUser.user);
    const [files, setFiles] = useState<IProductFile[]>([]);
    const loader = useLoaderAsync();

    useEffect(() => {
        if(user.id) {
            loader(async () => {
                services().user.get(user.id).then(setUser);
            });
            loader(async () => {
                services().file.get(user.id).then(setFiles);
            });
        }
    }, [userId]);


    return {user, files: files.sort((a, b) => b.id - a.id), isLoading: loader.isLoading};
});

const connect = inject<IUserFileListInputProps, UserFileListProps>(mergeProps(
    injectUserFileListProps,
));

export const UserFileList = connect(UserFileListComponent);
