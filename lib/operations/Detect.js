export default class Detect {
  constructor(API) {
    this.api = API;
  }
  async detectTypeFromContent(content /*buffer, stream, blob or plain string*/) {
    const req = await this.api.newBaseRequest('PUT');
    req.path = '/detect/stream';
    req.bodyType = 'BINARY';
    req.body = content;
    return await req.exec();
  }
}
