export default class Extract {
  constructor(API) {
    this.api = API;
  }
  async ExtractFromContent(content /*buffer, stream, blob or plain string*/, optionalHint) {
    const req = await this.api.newBaseRequest('PUT');
    req.path = '/unpacker';
    req.bodyType = 'BINARY';
    req.body = content;
    if (optionalHint) req.appendHeader('Content-Type', optionalHint);
    return await req.exec();
  }
}
