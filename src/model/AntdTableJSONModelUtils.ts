import {GenericFilterJSONModel, GenericFilterJSONModelArrayValue, GenericPagingJSONModel, GenericSortingJSONModel, SortOrder} from "geekfactory-jsonmodel-util";
import {FilterValue, SorterResult, TablePaginationConfig} from "antd/lib/table/interface";
import _ from "lodash"

export const updateGenericPagingJSONModel = (pagingJSONModel: GenericPagingJSONModel, tablePagination: TablePaginationConfig) => {
    pagingJSONModel.setValue(tablePagination.current, tablePagination.pageSize)
}

export const updateGenericSortingJSONModel = <TableItemType, >(sortingJSONModel: GenericSortingJSONModel, sorter: SorterResult<TableItemType>) => {
    const sortOrder: SortOrder | undefined = sorter.order == "ascend" || sorter.order == "descend" ? sorter.order : undefined
    const sortKey: string | undefined = !_.isEmpty(sorter.columnKey) ? `${sorter.columnKey}` : undefined

    if (sortOrder != undefined && sortKey != undefined) {
        sortingJSONModel.getSortKeyJSONModel().setValue(sortKey)
        sortingJSONModel.getSortOrderJSONModel().setValue(sortOrder)
    }
}

export const updateGenericFilterJSONModel = <TableItemType, FilterItemName>(filterJSONModel: GenericFilterJSONModel<FilterItemName, string>, filter: Record<string, FilterValue | null>) => {
    const values: Array<GenericFilterJSONModelArrayValue<FilterItemName, string>> = []
    _.each(filter, (filterValue, filterKey) => {
        if (filterValue != undefined && _.isArray(filterValue) && !_.isEmpty(filterValue)) {
            values.push({
                name: filterKey as unknown as FilterItemName,
                values: filterValue as Array<string>,
            })
        }
    })
    filterJSONModel.getFilterValuesJSONModel().setValue(values)
}

export const getTablePaginationConfigFromGenericPagingJSONModel = (pagingJSONModel: GenericPagingJSONModel, defaultPaginationConfig: TablePaginationConfig): TablePaginationConfig => {
    return {
        ...defaultPaginationConfig,
        pageSize: pagingJSONModel.getPageSize().getValue(),
        current: pagingJSONModel.getCurrentPage().getValue(),
    }
}

export const getTableSorterFromGenericPagingJSONModel = <TableItemType, >(sortingJSONModel: GenericSortingJSONModel): SorterResult<TableItemType> => {
    return {
        columnKey: sortingJSONModel.getSortKeyJSONModel().getValue(),
        order: sortingJSONModel.getSortOrderJSONModel().getValue(),
    }
}

export const getTableFilterFromGenericPagingJSONModel = (filterJSONModel: GenericFilterJSONModel<string, string>): Record<string, FilterValue | null> => {
    const filter: Record<string, FilterValue | null> = {}
    filterJSONModel.getFilterValuesJSONModel().getValue()?.forEach((filterValue) => {
        const name = filterValue.name
        const values = filterValue.values
        if (name != undefined && values != undefined && !_.isEmpty(values)) {
            filter[name] = values
        }
    })
    return filter
}