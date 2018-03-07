/**
 * Tag标签对象
 * @export
 * @class Tag
 */
export default class Tag {
  constructor ({id, path, name}) {
    Object.assign(this, {id, path, name})
  }
}
