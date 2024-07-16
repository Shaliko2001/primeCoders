export default class WrapMiddlwareUtil {
  static wrap(middleware) {
    return (client, next) => middleware(client, {}, next);
  }
}
