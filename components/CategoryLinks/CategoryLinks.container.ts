import { ITag, ITagGroup } from "@common-shared/tag/types";
import { services } from "@core/lib/api";
import { overridable } from "@core/lib/overridable";
import { useEffect, useState } from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import { CategoryLinksComponent } from "./CategoryLinks.component";
import { CategoryLinksProps, ICategoryLinksInputProps, ICategoryLinksProps } from "./CategoryLinks.d";

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

export const CategoryLinks = overridable<ICategoryLinksInputProps>(connect(CategoryLinksComponent));
