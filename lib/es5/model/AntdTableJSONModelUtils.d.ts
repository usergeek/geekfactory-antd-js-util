/// <reference types="react" />
import { GenericFilterJSONModel, GenericPagingJSONModel, GenericSortingJSONModel } from "geekfactory-jsonmodel-util";
import { FilterValue, SorterResult, TablePaginationConfig } from "antd/lib/table/interface";
export declare const updateGenericPagingJSONModel: (pagingJSONModel: GenericPagingJSONModel, tablePagination: TablePaginationConfig) => void;
export declare const updateGenericSortJSONModel: <TableItemType, SortKey extends string>(sortJSONModel: GenericSortingJSONModel<SortKey>, sorter: SorterResult<TableItemType> | SorterResult<TableItemType>[] | null) => void;
export declare const updateGenericFilterJSONModel: <FilterItemName, FilterItemValue>(filterJSONModel: GenericFilterJSONModel<FilterItemName, FilterItemValue>, filter: Record<string, FilterValue | null>) => void;
export declare const getTablePaginationConfigFromGenericPagingJSONModel: (pagingJSONModel: GenericPagingJSONModel, defaultPaginationConfig: TablePaginationConfig) => TablePaginationConfig;
export declare const getTableSorterFromGenericSortJSONModel: <TableItemType, SortKey extends string>(sortJSONModel: GenericSortingJSONModel<SortKey>) => SorterResult<TableItemType> | SorterResult<TableItemType>[];
export declare const getTableFilterFromGenericPagingJSONModel: <FilterItemName extends string, FilterItemValue extends import("react").Key>(filterJSONModel: GenericFilterJSONModel<FilterItemName, FilterItemValue>) => Record<string, FilterValue | null>;
