"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTableFilterFromGenericPagingJSONModel = exports.getTableSorterFromGenericPagingJSONModel = exports.getTablePaginationConfigFromGenericPagingJSONModel = exports.updateGenericFilterJSONModel = exports.updateGenericSortingJSONModel = exports.updateGenericPagingJSONModel = void 0;
const lodash_1 = __importDefault(require("lodash"));
const updateGenericPagingJSONModel = (pagingJSONModel, tablePagination) => {
    pagingJSONModel.setValue(tablePagination.current, tablePagination.pageSize);
};
exports.updateGenericPagingJSONModel = updateGenericPagingJSONModel;
const updateGenericSortingJSONModel = (sortingJSONModel, sorter) => {
    const sortOrder = sorter.order == "ascend" || sorter.order == "descend" ? sorter.order : undefined;
    const sortKey = !lodash_1.default.isEmpty(sorter.columnKey) ? `${sorter.columnKey}` : undefined;
    if (sortOrder != undefined && sortKey != undefined) {
        sortingJSONModel.getSortKeyJSONModel().setValue(sortKey);
        sortingJSONModel.getSortOrderJSONModel().setValue(sortOrder);
    }
};
exports.updateGenericSortingJSONModel = updateGenericSortingJSONModel;
const updateGenericFilterJSONModel = (filterJSONModel, filter) => {
    const values = [];
    lodash_1.default.each(filter, (filterValue, filterKey) => {
        if (filterValue != undefined && lodash_1.default.isArray(filterValue) && !lodash_1.default.isEmpty(filterValue)) {
            values.push({
                name: filterKey,
                values: filterValue,
            });
        }
    });
    filterJSONModel.getFilterValuesJSONModel().setValue(values);
};
exports.updateGenericFilterJSONModel = updateGenericFilterJSONModel;
const getTablePaginationConfigFromGenericPagingJSONModel = (pagingJSONModel, defaultPaginationConfig) => {
    return {
        ...defaultPaginationConfig,
        pageSize: pagingJSONModel.getPageSize().getValue(),
        current: pagingJSONModel.getCurrentPage().getValue(),
    };
};
exports.getTablePaginationConfigFromGenericPagingJSONModel = getTablePaginationConfigFromGenericPagingJSONModel;
const getTableSorterFromGenericPagingJSONModel = (sortingJSONModel) => {
    return {
        columnKey: sortingJSONModel.getSortKeyJSONModel().getValue(),
        order: sortingJSONModel.getSortOrderJSONModel().getValue(),
    };
};
exports.getTableSorterFromGenericPagingJSONModel = getTableSorterFromGenericPagingJSONModel;
const getTableFilterFromGenericPagingJSONModel = (filterJSONModel) => {
    var _a;
    const filter = {};
    (_a = filterJSONModel.getFilterValuesJSONModel().getValue()) === null || _a === void 0 ? void 0 : _a.forEach((filterValue) => {
        const name = filterValue.name;
        const values = filterValue.values;
        if (name != undefined && values != undefined && !lodash_1.default.isEmpty(values)) {
            filter[name] = values;
        }
    });
    return filter;
};
exports.getTableFilterFromGenericPagingJSONModel = getTableFilterFromGenericPagingJSONModel;
//# sourceMappingURL=AntdTableJSONModelUtils.js.map