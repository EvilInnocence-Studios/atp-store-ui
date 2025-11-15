import { overridable } from "@core/lib/overridable";
import {SearchPageSidebarProps} from "./SearchPageSidebar.d";
import styles from './SearchPageSidebar.module.scss';
import { Layout } from "antd";
import { TagFacets } from "@common/components/TagFacets";

export const SearchPageSidebarComponent = overridable(({selectedTagIds, selectTag, removeTag, showFilterBar}:SearchPageSidebarProps) => <>
    {showFilterBar && <Layout.Sider theme="light"width={300} className={styles.sider}>
        <TagFacets selectedTagIds={selectedTagIds} selectTag={selectTag} removeTag={removeTag} />
    </Layout.Sider>}
</>);
