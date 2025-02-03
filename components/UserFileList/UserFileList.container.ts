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
    const [q, setQ] = useState('');
    const loader = useLoaderAsync();

    useEffect(() => {
        if(userId) {
            loader(async () => {
                services().user.get(userId).then(setUser);
            });
        }
        if(user.id) {
            loader(async () => {
                services().file.get(user.id).then(setFiles);
            });
        }
    }, [userId, user.id]);

    return {
        user,
        files: files
            .filter(file => q.length === 0 || file.fileName.toLowerCase().includes(q.toLowerCase()))
            .sort((a, b) => b.id.localeCompare(a.id)),
        isLoading: loader.isLoading,
        q,
        setQ,
    };
});

const connect = inject<IUserFileListInputProps, UserFileListProps>(mergeProps(
    injectUserFileListProps,
));

export const UserFileList = connect(UserFileListComponent);
