import {TablePaginationConfig} from "antd/lib/table/interface";
import _ from "lodash"

const defaultPagination: TablePaginationConfig = {
    hideOnSinglePage: false,
    defaultPageSize: 10,
    pageSizeOptions: [5, 10, 20, 50, 100],
    showSizeChanger: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
}

export const TableCommon = {
    getDefaultPagination: (): TablePaginationConfig => _.cloneDeep(defaultPagination),
}