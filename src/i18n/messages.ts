// src/i18n/messages.ts
export const messages = {
  zh_CN: {
    errors: {
      readonly: {
        write: '不可向只读列表中写入数据',
        clear: '不可清空只读列表',
        remove: '不可从只读列表中删除数据'
      },
      params: {
        required: '{0} 不可为空',
        invalid: '{0} 无效',
        out_of_range: '参数 {0} 的范围越界',
        out_of_range_with_value: '参数 {0} 的范围越界 {1}',
        null: '参数 {0} 不可为空',
        null_without_name: '参数不可为空',
        invalid_with_name: '参数 {0} 存在异常',
        invalid_without_name: '参数存在异常'
      },
      key: {
        not_found: '不存在的Key'
      },
      operation: {
        invalid: '操作无效'
      },
      program: {
        exception: '程序出现异常'
      },
      array: {
        index_out_of_range: '数组下标越界',
        selector_required: '数值类型以外的数组必须传入 selector',
        no_match: '没有元素满足条件或源序列为空',
        empty: '源序列为空',
        multiple_elements: '输入的序列包含多个元素'
      }
    }
  },
  en_US: {
    errors: {
      readonly: {
        write: 'Cannot write to readonly list',
        clear: 'Cannot clear readonly list',
        remove: 'Cannot remove from readonly list'
      },
      params: {
        required: '{0} is required',
        invalid: '{0} is invalid',
        out_of_range: 'Parameter {0} is out of range',
        out_of_range_with_value: 'Parameter {0} is out of range: {1}',
        null: 'Parameter {0} cannot be null',
        null_without_name: 'Parameter cannot be null',
        invalid_with_name: 'Parameter {0} is invalid',
        invalid_without_name: 'Parameter is invalid'
      },
      key: {
        not_found: 'Key not found'
      },
      operation: {
        invalid: 'Invalid operation'
      },
      program: {
        exception: 'Program exception occurred'
      },
      array: {
        index_out_of_range: 'Array index out of range',
        selector_required: 'Selector is required for non-numeric arrays',
        no_match: 'No element satisfies the condition or source sequence is empty',
        empty: 'Source sequence is empty',
        multiple_elements: 'The input sequence contains multiple elements'
      }
    }
  }
}
