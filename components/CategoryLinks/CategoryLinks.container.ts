import { createInjector, inject, mergeProps } from "unstateless";
import {CategoryLinksComponent} from "./CategoryLinks.component";
import {ICategoryLinksInputProps, CategoryLinksProps, ICategoryLinksProps} from "./CategoryLinks.d";
import { useEffect, useState } from "react";
import { ITagGroup, ITag } from "@common-shared/tag/types";
import { services } from "@core/lib/api";

const injectCategoryLinksProps = createInjector(({}:ICategoryLinksInputProps):ICategoryLinksProps => {
    const [group, setGroup] = useState<ITagGroup | null>(null);
    const [tags, setTags] = useState<ITag[]>([]);

    useEffect(() => {
        services().tagGroup.search({name: "Product Type"}).then(([group]) => setGroup(group));
    }, []);

    useEffect(() => {
        if (group) {
            services().tagGroup.tag.search(group.id).then(setTags);
        }
    }, [group]);
    
    return {links: tags.map(tag => ({name: tag.name, url: `/products?tags=${tag.id}`}))};
});

const connect = inject<ICategoryLinksInputProps, CategoryLinksProps>(mergeProps(
    injectCategoryLinksProps,
));

export const CategoryLinks = connect(CategoryLinksComponent);
