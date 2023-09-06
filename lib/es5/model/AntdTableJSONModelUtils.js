"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTableFilterFromGenericPagingJSONModel = exports.getTableSorterFromGenericSortJSONModel = exports.getTablePaginationConfigFromGenericPagingJSONModel = exports.updateGenericFilterJSONModel = exports.updateGenericSortJSONModel = exports.updateGenericPagingJSONModel = void 0;
const geekfactory_jsonmodel_util_1 = require("geekfactory-jsonmodel-util");
const lodash_1 = __importDefault(require("lodash"));
const GenericFilterJSONModel_1 = require("geekfactory-jsonmodel-util/lib/es5/model/GenericFilterJSONModel");
const updateGenericPagingJSONModel = (pagingJSONModel, tablePagination) => {
    pagingJSONModel.setValue(tablePagination.current, tablePagination.pageSize);
};
exports.updateGenericPagingJSONModel = updateGenericPagingJSONModel;
const updateGenericSortJSONModel = (sortJSONModel, sorter) => {
    if (sorter != undefined) {
        if (lodash_1.default.isArray(sorter)) {
            const values = lodash_1.default.compact(lodash_1.default.map(sorter, (sorterItem) => {
                return getSortValuesJSONModelSerializedStateFromSorter(sorterItem);
            }));
            if (values.length > 0) {
                sortJSONModel.overwriteFromSortValuesJSONModels(lodash_1.default.map(values, (value) => {
                    return new geekfactory_jsonmodel_util_1.GenericSortingItemJSONModel(value);
                }));
                return;
            }
        }
        else {
            const serializedStateFromSorter = getSortValuesJSONModelSerializedStateFromSorter(sorter);
            if (serializedStateFromSorter != undefined) {
                sortJSONModel.overwriteFromSortValuesJSONModels(lodash_1.default.map([serializedStateFromSorter], (value) => {
                    return new geekfactory_jsonmodel_util_1.GenericSortingItemJSONModel(value);
                }));
                return;
            }
        }
    }
    sortJSONModel.reset();
};
exports.updateGenericSortJSONModel = updateGenericSortJSONModel;
const getSortValuesJSONModelSerializedStateFromSorter = (sorter) => {
    // {column: undefined, order: undefined, field: undefined, columnKey: 'proposalCreatedTime'}
    const sortOrder = antdSortOrderToJSONModelSortOrder(sorter.order);
    const sortKey = antdSortKeyToJSONModelSortKey(sorter.columnKey);
    if (sortOrder != undefined && sortKey != undefined) {
        const sortItemJSONModel = new geekfactory_jsonmodel_util_1.GenericSortingItemJSONModel();
        sortItemJSONModel.getKeyJSONModel().setValue(sortKey);
        sortItemJSONModel.getOrderJSONModel().setValue(sortOrder);
        return sortItemJSONModel.serialize();
    }
};
const updateGenericFilterJSONModel = (filterJSONModel, filter) => {
    const values = [];
    lodash_1.default.each(filter, (filterValue, filterKey) => {
        if (filterValue != undefined && lodash_1.default.isArray(filterValue) && !lodash_1.default.isEmpty(filterValue)) {
            const itemJSONModel = new GenericFilterJSONModel_1.GenericFilterItemJSONModel();
            itemJSONModel.setNameAndValues(filterKey, filterValue);
            values.push(itemJSONModel);
        }
    });
    filterJSONModel.overwriteFromFilterValuesJSONModels(values);
};
exports.updateGenericFilterJSONModel = updateGenericFilterJSONModel;
const getTablePaginationConfigFromGenericPagingJSONModel = (pagingJSONModel, defaultPaginationConfig) => {
    return {
        ...defaultPaginationConfig,
        pageSize: pagingJSONModel.getLimitValue(),
        current: pagingJSONModel.getPageValue(),
    };
};
exports.getTablePaginationConfigFromGenericPagingJSONModel = getTablePaginationConfigFromGenericPagingJSONModel;
const getTableSorterFromGenericSortJSONModel = (sortJSONModel) => {
    const value = sortJSONModel.getSortItems();
    if (value != undefined && value.length > 0) {
        if (value.length > 1) {
            return lodash_1.default.map(value, (sortItem) => {
                return {
                    columnKey: sortItem.getKeyJSONModel().getValue(),
                    order: jsonModelSortOrderToAntdSortOrder(sortItem.getOrderJSONModel().getValue()),
                };
            });
        }
        else {
            const sortItem = value[0];
            return {
                columnKey: sortItem.getKeyJSONModel().getValue(),
                order: jsonModelSortOrderToAntdSortOrder(sortItem.getOrderJSONModel().getValue()),
            };
        }
    }
    return {};
};
exports.getTableSorterFromGenericSortJSONModel = getTableSorterFromGenericSortJSONModel;
const getTableFilterFromGenericPagingJSONModel = (filterJSONModel) => {
    var _a;
    const filter = {};
    (_a = filterJSONModel.getFilterItems()) === null || _a === void 0 ? void 0 : _a.forEach((filterValue) => {
        const name = filterValue.getNameJSONModel().getValue();
        const values = filterValue.getValuesJSONModel().getValue();
        if (name != undefined && values != undefined && !lodash_1.default.isEmpty(values)) {
            filter[name] = values;
        }
    });
    return filter;
};
exports.getTableFilterFromGenericPagingJSONModel = getTableFilterFromGenericPagingJSONModel;
const antdSortOrderToJSONModelSortOrder = (antdSortOrder) => {
    if (antdSortOrder != undefined) {
        if (antdSortOrder == "ascend") {
            return geekfactory_jsonmodel_util_1.SORT_ODER_ASC;
        }
        else if (antdSortOrder == "descend") {
            return geekfactory_jsonmodel_util_1.SORT_ODER_DESC;
        }
    }
};
const jsonModelSortOrderToAntdSortOrder = (sortOrder) => {
    if (sortOrder != undefined) {
        if (sortOrder == geekfactory_jsonmodel_util_1.SORT_ODER_ASC) {
            return "ascend";
        }
        else if (sortOrder == geekfactory_jsonmodel_util_1.SORT_ODER_DESC) {
            return "descend";
        }
    }
};
const antdSortKeyToJSONModelSortKey = (antdSortKey) => {
    return !lodash_1.default.isEmpty(antdSortKey) ? `${antdSortKey}` : undefined;
};
//# sourceMappingURL=AntdTableJSONModelUtils.js.map