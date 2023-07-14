"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableCommon = void 0;
const lodash_1 = __importDefault(require("lodash"));
const defaultPagination = {
    hideOnSinglePage: false,
    defaultPageSize: 10,
    pageSizeOptions: [5, 10, 20, 50, 100],
    showSizeChanger: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
};
exports.TableCommon = {
    getDefaultPagination: () => lodash_1.default.cloneDeep(defaultPagination),
};
//# sourceMappingURL=TableCommon.js.map