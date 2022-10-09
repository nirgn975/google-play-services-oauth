import * as Base64 from 'crypto-js/enc-base64';

/**
 * @class OAuthUtil
 */
export class OAuthUtil {
  Base64 = {
      _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_',
      stringify: Base64.stringify,
      parse: Base64.parse,
  };

  /**
   * @class OAuthUtil
   * @constructor
   */
  constructor() {}

  /**
   * Connect to MongoDB.
   *
   * @class Server
   * @method connectMongoDB
   * @return void
   */
  public async parseKeyValues(body: any) {
    console.log('parseKeyValues-body', body);
    var obj: any = {};
    body.split("\n").forEach(function (line: any) {
        const pos = line.indexOf('=');
        const foo = line.substr(0, pos);
        if (pos > 0) obj[foo] = line.substr(pos + 1);
    });
    return obj;
  }

  /**
   * Connect to MongoDB.
   *
   * @class Server
   * @method connectMongoDB
   * @return void
   */
  public async salt(len: any) {
    console.log('salt-len', len);
    return Array.apply(0, Array(len)).map(function () {
        return (function (charset) {
            return charset.charAt(Math.floor(Math.random() * charset.length));
        }('abcdefghijklmnopqrstuvwxyz0123456789'));
    }).join('');
  }
}

export default new OAuthUtil;
