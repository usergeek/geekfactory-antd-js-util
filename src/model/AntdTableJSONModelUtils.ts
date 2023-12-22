import {GenericFilterJSONModel, GenericPagingJSONModel, GenericSortingItemJSONModel, GenericSortingItemJSONModelSerializedState, GenericSortingJSONModel, SORT_ODER_ASC, SORT_ODER_DESC, SortOrder} from "geekfactory-jsonmodel-util";
import {FilterValue, Key as AntdKey, SorterResult, SortOrder as AntdSortOrder, TablePaginationConfig} from "antd/lib/table/interface";
import _ from "lodash"
import {GenericFilterItemJSONModel} from "geekfactory-jsonmodel-util/lib/es5/model/GenericFilterJSONModel";

type Key = string | number | boolean;

export const updateGenericPagingJSONModel = (pagingJSONModel: GenericPagingJSONModel, tablePagination: TablePaginationConfig) => {
    pagingJSONModel.setValue(tablePagination.current, tablePagination.pageSize)
}

export const updateGenericSortJSONModel = <TableItemType, SortKey extends string>(sortJSONModel: GenericSortingJSONModel<SortKey>, sorter: SorterResult<TableItemType> | SorterResult<TableItemType>[] | null) => {
    if (sorter != undefined) {
        if (_.isArray(sorter)) {
            const values = _.compact(_.map(sorter, (sorterItem) => {
                return getSortValuesJSONModelSerializedStateFromSorter<TableItemType, SortKey>(sorterItem)
            }))
            if (values.length > 0) {
                sortJSONModel.overwriteFromSortValuesJSONModels(_.map(values, (value) => {
                    return new GenericSortingItemJSONModel<SortKey>(value)
                }))
                return
            }
        } else {
            const serializedStateFromSorter = getSortValuesJSONModelSerializedStateFromSorter<TableItemType, SortKey>(sorter);
            if (serializedStateFromSorter != undefined) {
                sortJSONModel.overwriteFromSortValuesJSONModels(_.map([serializedStateFromSorter], (value) => {
                    return new GenericSortingItemJSONModel<SortKey>(value)
                }))
                return
            }
        }
    }
    sortJSONModel.reset()
}

const getSortValuesJSONModelSerializedStateFromSorter = <TableItemType, SortKey extends string>(sorter: SorterResult<TableItemType>): GenericSortingItemJSONModelSerializedState<SortKey> | undefined => {
    // {column: undefined, order: undefined, field: undefined, columnKey: 'proposalCreatedTime'}
    const sortOrder: SortOrder | undefined = antdSortOrderToJSONModelSortOrder(sorter.order)
    const sortKey: string | undefined = antdSortKeyToJSONModelSortKey(sorter.columnKey)
    if (sortOrder != undefined && sortKey != undefined) {
        const sortItemJSONModel = new GenericSortingItemJSONModel<SortKey>();
        sortItemJSONModel.getKeyJSONModel().setValue(sortKey)
        sortItemJSONModel.getOrderJSONModel().setValue(sortOrder)
        return sortItemJSONModel.serialize()
    }
}

export const updateGenericFilterJSONModel = <FilterItemName extends string, FilterItemValue>(filterJSONModel: GenericFilterJSONModel<FilterItemName, FilterItemValue>, filter: Record<string, FilterValue | null>) => {
    const values: Array<GenericFilterItemJSONModel<FilterItemName, FilterItemValue>> = []
    _.each(filter, (filterValue, filterKey) => {
        if (filterValue != undefined && _.isArray(filterValue) && !_.isEmpty(filterValue)) {
            const itemJSONModel = new GenericFilterItemJSONModel<FilterItemName, FilterItemValue>();
            itemJSONModel.setNameAndValues(filterKey as unknown as FilterItemName, filterValue as unknown as Array<FilterItemValue>)
            values.push(itemJSONModel)
        }
    })
    filterJSONModel.overwriteFromFilterValuesJSONModels(values)
}

export const getTablePaginationConfigFromGenericPagingJSONModel = (pagingJSONModel: GenericPagingJSONModel, defaultPaginationConfig: TablePaginationConfig): TablePaginationConfig => {
    return {
        ...defaultPaginationConfig,
        pageSize: pagingJSONModel.getLimitValue(),
        current: pagingJSONModel.getPageValue(),
    }
}

export const getTableSorterFromGenericSortJSONModel = <TableItemType, SortKey extends string>(sortJSONModel: GenericSortingJSONModel<SortKey>): SorterResult<TableItemType> | SorterResult<TableItemType>[] => {
    const value: Array<GenericSortingItemJSONModel<SortKey>> | undefined = sortJSONModel.getSortItems();
    if (value != undefined && value.length > 0) {
        if (value.length > 1) {
            return _.map(value, (sortItem) => {
                return {
                    columnKey: sortItem.getKeyJSONModel().getValue(),
                    order: jsonModelSortOrderToAntdSortOrder(sortItem.getOrderJSONModel().getValue()),
                }
            })
        } else {
            const sortItem = value[0]
            return {
                columnKey: sortItem.getKeyJSONModel().getValue(),
                order: jsonModelSortOrderToAntdSortOrder(sortItem.getOrderJSONModel().getValue()),
            }
        }
    }
    return {}
}

export const getTableFilterFromGenericPagingJSONModel = <FilterItemName extends string, FilterItemValue extends Key>(filterJSONModel: GenericFilterJSONModel<FilterItemName, FilterItemValue>): Record<string, FilterValue | null> => {
    const filter: Record<string, FilterValue | null> = {}
    filterJSONModel.getFilterItems()?.forEach((filterValue) => {
        const name = filterValue.getNameJSONModel().getValue()
        const values = filterValue.getValuesJSONModel().getValue()
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