export const Greeter = (name: string) => `Hello ${name}`;

import * as https from 'https';
import * as querystring from'querystring';
import * as url from 'url';
import got, { GotRequestFunction } from 'got';

import { OAuthUtil } from "./util";


const AUTH_URL = 'https://android.clients.google.com/auth';

const USER_AGENT = 'Dalvik/2.1.0 (Linux; U; Android 5.1.1; Andromax I56D2G Build/LMY47V';

interface Options {
  url: string;
  method: string;
  options: string;
  contentType: string;
}

/**
 * @class GoogleOauth
 */
export class GoogleOauth {
  oauthUtil: any;
  _token: any;

  /**
   * @class Api
   * @constructor
   */
  constructor() {
    this.oauthUtil = new OAuthUtil();
  }

  /**
   * Connect to MongoDB.
   *
   * @class Server
   * @method connectMongoDB
   * @return void
   */
  public async login(email: string, password: string, android_id: string) {
    const data = {
        accountType: 'HOSTED_OR_GOOGLE',
        Email: email.trim(),
        has_permission: '1',
        add_account: '1',
        Passwd: password,
        service: 'ac2dm',
        source: 'android',
        androidId: android_id,
        device_country: 'us',
        operatorCountry: 'us',
        lang: 'en',
        sdk_version: '17'
    };

    const response = await got.post(AUTH_URL, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: querystring.stringify(data),
    });

    console.log('login-response', response);
    var responseData = this.oauthUtil.parseKeyValues(response);
    return {androidId: android_id, masterToken: responseData.Token};
  }

  /**
   * Connect to MongoDB.
   *
   * @class Server
   * @method connectMongoDB
   * @return void
   */
  public async oauth(email: string, master_token: string, android_id: string, service: string, app: string, client_sig: string) {
    const data = {
        accountType: 'HOSTED_OR_GOOGLE',
        Email: email,
        EncryptedPasswd: master_token,
        has_permission: 1,
        service: service,
        source: 'android',
        androidId: android_id,
        app: app,
        client_sig: client_sig,
        device_country: 'us',
        operatorCountry: 'us',
        lang: 'en',
        sdk_version: '17'
    };

    const response = await got.post(AUTH_URL, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: querystring.stringify(data),
    });

    return this.oauthUtil.parseKeyValues(data);
  }

  /**
   * Express configuration.
   *
   * @class Server
   * @method configurExpress
   * @return void
   */
  private async request(options: Options) {
    console.log("options", options);
    const opt: any = url.parse(options.url);
    opt.headers = {};
    opt.method = options.method || "GET";
    if (typeof options.options === "object") {
        Object.keys(options.options).forEach(function (k: any) {
            opt[k] = options.options[k];
        });
    }
    if (typeof this._token !== "undefined") opt.headers.Authorization = "GoogleLogin auth=" + this._token;
    opt.headers['User-Agent'] = USER_AGENT;
    opt.headers["Content-type"] = options.contentType || "application/x-www-form-urlencoded";
    var req = https.request(opt, function (res: any) {

        res.setEncoding('utf8');
        var body = "";
        res.on('data', function (chunk: any) {
            body += chunk;
        });
        res.on('end', function () {
            var err: any;
            if (res.statusCode >= 400) {
                err = new Error(res.statusCode + " error from server");
                err.statusCode = res.statusCode;
                err.response = res;
            }

            var contentType = (typeof res.headers["content-type"] !== "string") ? null : res.headers["content-type"].split(";", 1)[0].toLowerCase();
            var response = body;
            try {
                if (contentType === "application/json") {
                    response = JSON.parse(response);
                }
            } catch (e) {
                if (typeof callback === "function") callback(new Error("unable to parse json response: " + e), null, res);
            }
            if (typeof callback === "function") callback(err, response, res);
        });
        res.on('error', function (error: any) {
            var err: any = new Error("Error making https request");
            err.error = error;
            err.response = res;
            if (typeof callback === "function") callback(err, body, res);
        });
    });
    if (typeof options.data !== "undefined") req.write(options.data);
    req.end();
  }
}

// module.exports = exports = GoogleOauth;
export default new GoogleOauth;
