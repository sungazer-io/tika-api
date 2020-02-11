export default class TikaDefinitions {}
//
TikaDefinitions.StatusCode = {
  OK: 200,
  NoContent: 204, //No content (for example when we are unpacking file without attachments)
  UnknownFileType: 415, //Unknown file type
  Unparsable: 422, //Unparsable document of known type (password protected documents and unsupported versions like Biff5 Excel)
  InternalError: 500 //Internal error
};
