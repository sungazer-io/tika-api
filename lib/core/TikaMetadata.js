const csv = require('csvtojson');
//
export default class TikaMetadata {
  constructor(contents) {
    this.raw = contents;
    this.json = null; //opt
  }
  async getMime() { return await this.getValueForKey('Content-Type'); }
  async getValueForKey(key) {
    if (!this.json) await this.toJSON();
    if (this.json) {
      for (let obj of this.json) {
        if (obj.key == key) return obj.value;
      }
    } return null;
  }
  async toJSON() {
    if (this.json) return this.json;
    //
    try {
      this.json = await csv({
	       noheader:true,
	       headers: [ "key", "value" ]
        }).fromString(this.raw);
    } catch (e) {
      console.error("Error while decoding Tika metadata.");
    } return this.json;
  }
  _parseConfigs() {
    return {
      noheader:true,
      headers: [ "key", "value" ],
      colParser: {
        "value": (item, head, resultRow, row , colIdx) => {
          //Aggregation of other values into value array
          const subItems = [item];
          //Scan from row.idx 2
          let completed = 2;
          while (completed > 0) {
            if (row[completed]) {
              subItems.push(row[completed]);
              completed++;
            } else completed = -1;//done
          } return subItems;
        }
      }
    }
  }
}
