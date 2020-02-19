export default class Meta {
  constructor(API) {
    this.api = API;
  }
  async getMetaFromContent(content /*buffer, stream, blob or plain string*/) {
    const req = await this.api.newBaseRequest('PUT');
    req.path = '/meta';
    req.body = content;
    return await req.exec();
  }
}
