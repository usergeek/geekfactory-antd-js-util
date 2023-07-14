import { GenericFilterJSONModel, GenericPagingJSONModel, GenericSortingJSONModel } from "geekfactory-jsonmodel-util";
import { FilterValue, SorterResult, TablePaginationConfig } from "antd/lib/table/interface";
export declare const updateGenericPagingJSONModel: (pagingJSONModel: GenericPagingJSONModel, tablePagination: TablePaginationConfig) => void;
export declare const updateGenericSortingJSONModel: <TableItemType>(sortingJSONModel: GenericSortingJSONModel, sorter: SorterResult<TableItemType>) => void;
export declare const updateGenericFilterJSONModel: <TableItemType, FilterItemName>(filterJSONModel: GenericFilterJSONModel<FilterItemName, string>, filter: Record<string, FilterValue | null>) => void;
export declare const getTablePaginationConfigFromGenericPagingJSONModel: (pagingJSONModel: GenericPagingJSONModel, defaultPaginationConfig: TablePaginationConfig) => TablePaginationConfig;
export declare const getTableSorterFromGenericPagingJSONModel: <TableItemType>(sortingJSONModel: GenericSortingJSONModel) => SorterResult<TableItemType>;
export declare const getTableFilterFromGenericPagingJSONModel: (filterJSONModel: GenericFilterJSONModel<string, string>) => Record<string, FilterValue | null>;
