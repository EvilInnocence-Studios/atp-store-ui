import { useNavigate, useSearchParams } from "react-router";
import { unique } from "ts-functional";

export declare interface ISearch {
    q?: string;
    selectedTagIds: string[];
    sortBy: string;
    perPage: string;
    search: (term?:string, nav?: boolean) => void;
    selectTag: (tagId: string) => void;
    removeTag: (tagId: string) => void;
    setSortBy: (order: string) => void;
    setPerPage: (perPage: string) => void;
    clearAll: () => void;
    clearSearch: () => void;
}

export const useSearch = ():ISearch => {
    const [query, setQuery] = useSearchParams();
    const navigate = useNavigate();

    const {q, tags:selectedTagIdsRaw = "", sortBy = "newest", perPage = "12"} = Object.fromEntries(query.entries()) as unknown as {q?: string, tags?: string, sortBy:string, perPage: string};
    const selectedTagIds:string[] = selectedTagIdsRaw ? selectedTagIdsRaw.split(',') : [];

    const updateQuery = (q: string | undefined, tags: string[], sortBy?: string, perPage?: string) => {
        const params = {
            ...(!!q ? {q} : {}),
            ...(tags.length > 0 ? {tags: tags.join(",")} : {}),
            ...(!!sortBy ? {sortBy} : {}),
            ...(!!perPage ? {perPage} : {}),
        };
        setQuery(params);
        navigate(`/products?${new URLSearchParams(params).toString()}`);
    }

    const search = (term?:string) => {
        updateQuery(term, selectedTagIds, sortBy, perPage);
    }

    const selectTag = (tagId: string) => {
        updateQuery(q, unique([...selectedTagIds, tagId]), sortBy, perPage);
    }

    const removeTag = (tagId: string) => {
        updateQuery(q, selectedTagIds.filter(id => id !== tagId), sortBy, perPage);
    }

    const setSortBy = (order: string) => {
        updateQuery(q, selectedTagIds, order, perPage);
    }

    const setPerPage = (perPage: string) => {
        updateQuery(q, selectedTagIds, sortBy, perPage);
    }

    const clearAll = () => {
        updateQuery(undefined, [], sortBy, perPage);
    }

    const clearSearch = () => {
        updateQuery(undefined, selectedTagIds, sortBy, perPage);
    }

    return {
        q, selectedTagIds, sortBy, perPage,
        search, selectTag, removeTag, setSortBy, setPerPage,
        clearAll, clearSearch,
    };
}