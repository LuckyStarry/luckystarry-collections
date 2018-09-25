import { IsNull } from './is-null'
import { IsUndefined } from './is-undefined'

export function IsNullOrUndefined(target): boolean {
  return IsNull(target) || IsUndefined(target)
}
