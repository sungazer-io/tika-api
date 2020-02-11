import APIRequest from './Request';
import Definitions from './TikaDefinitions';

// API Compoenents
import OperationDetect from './operations/Detect';
import OperationExtract from './operations/Extract';
import OperationMeta from './operations/Meta';
import OperationUnpack from './operations/Unpack';
//
export default class Client {
  /* config structure
    {
      endpoint: 'https://localhost',
      port: 9998,
    }
  */
  constructor(config) {
    this._config = config; //TODO: sanitize config
    // api operations
    this.detect = OperationDetect(this);
    this.extract = OperationExtract(this);
    this.meta = OperationMeta(this);
    this.unpack = OperationUnpack(this);
  }

  async newBaseRequest(method) {
    const req = new APIRequest(method);
    //
    req.baseURL = this.config.endpoint;
    if (this.config.port) req.baseURL += `:${this.config.port}`;
    //
    return req;
  }
}
export { Definitions as Definitions };
