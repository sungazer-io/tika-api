export default class Extract {
  constructor(API) {
    this.api = API;
  }
  async extractFromContent(content /*buffer, stream, blob or plain string*/, optionalHint) {
    const req = await this.api.newBaseRequest('PUT');
    req.path = '/unpack/all';
    req.body = content;
    if (optionalHint) req.appendHeader('Content-Type', optionalHint);
    return await req.exec();
  }
}
