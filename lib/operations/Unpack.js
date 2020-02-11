export default class Unpack {
  constructor(API) {
    this.api = API;
  }
  async unpackFromContent(content /*buffer, stream, blob or plain string*/) {
    const req = await this.api.newBaseRequest('PUT');
    req.path = '/unpacker';
    req.bodyType = 'BINARY';
    req.body = content;
    return await req.exec();
  }
}
