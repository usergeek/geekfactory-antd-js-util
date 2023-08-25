import {GenericFilterJSONModel, GenericFilterJSONModelArrayValue, GenericPagingJSONModel, GenericSortingItemJSONModel, GenericSortingItemJSONModelSerializedState, GenericSortingJSONModel, GenericSortingJSONModelSerializedState, SORT_ODER_ASC, SORT_ODER_DESC, SortOrder} from "geekfactory-jsonmodel-util";
import {FilterValue, Key, Key as AntdKey, SorterResult, SortOrder as AntdSortOrder, TablePaginationConfig} from "antd/lib/table/interface";
import _ from "lodash"

export const updateGenericPagingJSONModel = (pagingJSONModel: GenericPagingJSONModel, tablePagination: TablePaginationConfig) => {
    pagingJSONModel.setValue(tablePagination.current, tablePagination.pageSize)
}

export const updateGenericSortJSONModel = <TableItemType, SortKey extends string>(sortJSONModel: GenericSortingJSONModel<SortKey>, sorter: SorterResult<TableItemType> | SorterResult<TableItemType>[] | null) => {
    if (sorter != undefined) {
        if (_.isArray(sorter)) {
            console.log("updateGenericSortJSONModel: array", sorter);
            const values = _.compact(_.map(sorter, (sorterItem) => {
                return getSortValuesJSONModelSerializedStateFromSorter<TableItemType, SortKey>(sorterItem)
            }))
            console.log("updateGenericSortJSONModel: values", values);
            if (values.length > 0) {
                sortJSONModel.getSortValuesJSONModel().setValue(values)
                return
            }
        } else {
            console.log("updateGenericSortJSONModel: single", sorter);
            const serializedStateFromSorter = getSortValuesJSONModelSerializedStateFromSorter<TableItemType, SortKey>(sorter);
            console.log("updateGenericSortJSONModel: serializedStateFromSorter", serializedStateFromSorter);
            if (serializedStateFromSorter != undefined) {
                sortJSONModel.getSortValuesJSONModel().setValue([serializedStateFromSorter])
                return
            }
        }
    }
    console.log("updateGenericSortJSONModel: reset");
    sortJSONModel.getSortValuesJSONModel().reset()
}

const getSortValuesJSONModelSerializedStateFromSorter = <TableItemType, SortKey extends string>(sorter: SorterResult<TableItemType>): GenericSortingItemJSONModelSerializedState<SortKey> | undefined => {
    // {column: undefined, order: undefined, field: undefined, columnKey: 'proposalCreatedTime'}
    const sortOrder: SortOrder | undefined = antdSortOrderToJSONModelSortOrder(sorter.order)
    const sortKey: string | undefined = antdSortKeyToJSONModelSortKey(sorter.columnKey)
    console.log("getSortValuesJSONModelSerializedStateFromSorter: ", {sorter, sortOrder, sortKey});
    if (sortOrder != undefined && sortKey != undefined) {
        const sortItemJSONModel = new GenericSortingItemJSONModel<SortKey>();
        sortItemJSONModel.getKeyJSONModel().setValue(sortKey)
        sortItemJSONModel.getOrderJSONModel().setValue(sortOrder)
        return sortItemJSONModel.serialize()
    }
}

export const updateGenericFilterJSONModel = <FilterItemName, FilterItemValue>(filterJSONModel: GenericFilterJSONModel<FilterItemName, FilterItemValue>, filter: Record<string, FilterValue | null>) => {
    const values: Array<GenericFilterJSONModelArrayValue<FilterItemName, FilterItemValue>> = []
    _.each(filter, (filterValue, filterKey) => {
        if (filterValue != undefined && _.isArray(filterValue) && !_.isEmpty(filterValue)) {
            values.push({
                name: filterKey as unknown as FilterItemName,
                values: filterValue as unknown as Array<FilterItemValue>,
            })
        }
    })
    filterJSONModel.getFilterValuesJSONModel().setValue(values)
}

export const getTablePaginationConfigFromGenericPagingJSONModel = (pagingJSONModel: GenericPagingJSONModel, defaultPaginationConfig: TablePaginationConfig): TablePaginationConfig => {
    return {
        ...defaultPaginationConfig,
        pageSize: pagingJSONModel.getLimitValue(),
        current: pagingJSONModel.getPageValue(),
    }
}

export const getTableSorterFromGenericSortJSONModel = <TableItemType, SortKey extends string>(sortJSONModel: GenericSortingJSONModel<SortKey>): SorterResult<TableItemType> | SorterResult<TableItemType>[] => {
    const value: GenericSortingJSONModelSerializedState<SortKey> | undefined = sortJSONModel.getSortValuesJSONModel().getValue();
    if (value != undefined && value.length > 0) {
        if (value.length > 1) {
            return _.map(value, (sortItem) => {
                return {
                    columnKey: sortItem.key,
                    order: jsonModelSortOrderToAntdSortOrder(sortItem.order),
                }
            })
        } else {
            const sortItem = value[0]
            return {
                columnKey: sortItem.key,
                order: jsonModelSortOrderToAntdSortOrder(sortItem.order),
            }
        }
    }
    return {}
}

export const getTableFilterFromGenericPagingJSONModel = <FilterItemName extends string, FilterItemValue extends Key>(filterJSONModel: GenericFilterJSONModel<FilterItemName, FilterItemValue>): Record<string, FilterValue | null> => {
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

const antdSortOrderToJSONModelSortOrder = (antdSortOrder?: AntdSortOrder): SortOrder | undefined => {
    if (antdSortOrder != undefined) {
        if (antdSortOrder == "ascend") {
            return SORT_ODER_ASC
        } else if (antdSortOrder == "descend") {
            return SORT_ODER_DESC
        }
    }
}

const jsonModelSortOrderToAntdSortOrder = (sortOrder?: string): AntdSortOrder | undefined => {
    if (sortOrder != undefined) {
        if (sortOrder == SORT_ODER_ASC) {
            return "ascend"
        } else if (sortOrder == SORT_ODER_DESC) {
            return "descend"
        }
    }
}

const antdSortKeyToJSONModelSortKey = (antdSortKey?: AntdKey): string | undefined => {
    return !_.isEmpty(antdSortKey) ? `${antdSortKey}` : undefined
}