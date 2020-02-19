import URLQuery from 'query-string-manipulator'; //so lazy.. TODO: replace me by s
//
const fetch = require("node-fetch");
const JSZip = require("jszip");
//
export default class APIRequest {
  constructor(method) {
    this.baseURL = null;
    this.path = '';
    this.method = method;
    this.headers = {};
    this.body = {};
    this.queryParameters = {};
    this.bodyType = 'BINARY';
    //this.appendHeader('Accept', 'application/json');
  }

  async exec() {
    try {
      // Build URL
      let reqURL = null;
      if (Object.keys(this.queryParameters).length > 0)
        reqURL = URLQuery(this.baseURL + this.path, { set: this.queryParameters });
      else reqURL = this.baseURL + this.path;
      console.debug('Tika Request', reqURL);
      // Make request
      const respObj = await fetch(reqURL, this._buildRequest());
      //Build and return response
      return await this._buildResponse(respObj);
    } catch (e) {
      return { error: e, statusCode: -1 };
    }
  }
  //
  appendHeader(key, value) {
    this.headers[key] = value;
  }
  appendQueryParam(key, value) {
    this.queryParameters[key] = value;
  }
  /* private */
  _buildRequest() {
    let request = {
      method: this.method,
      redirect: 'follow',
      ...(Object.keys(this.headers).length > 0 ? { headers: this.headers } : {}),
    };
    if (this.bodyType == 'JSON') {
      if (Object.keys(this.body).length > 0) request.body = JSON.stringify(this.body);
    } else if (this.bodyType == 'BINARY') {
      if (this.body && this.body.length > 0) request.body = this.body;
    } else {
      if (this.body) request.body = this.body;
    }
    return request;
  }
  async _buildResponse(respObj) {
    const contentType = respObj.headers.get('Content-Type');
    if (contentType && contentType.includes('zip')) {
      //Unzip
      const content = await JSZip.loadAsync(respObj.buffer());
      //Aggregate files
      let files = {};
      for (let fileKey of Object.keys(contents.files)) files[fileKey] = zip.file(fileKey).async('string');
      //
      return { body: files, statusCode: respObj.status };
    } else if (contentType && contentType.includes('json')) {
      return { body: await respObj.json(), statusCode: respObj.status };
    } else if ((contentType && contentType.includes('image')) || this.bodyType == 'BINARY') {
      return { body: await respObj.blob(), statusCode: respObj.status };
    } return { body: await respObj.text(), statusCode: respObj.status };
  }
}
