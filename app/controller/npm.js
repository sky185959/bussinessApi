// app/controller/npm.js
const fs = require('fs');
const Controller = require('egg').Controller;
const path = require('path');
const sendToWormhole = require('stream-wormhole');
class NpmController extends Controller {

  async upload() {
  	const ctx = this.ctx;
    const stream = await ctx.getFileStream();
    const name = '/Applications/XAMPP/xamppfiles/htdocs/bussinessApi/' + path.basename(stream.filename);
    let result;
    console.log(name)
    console.log(stream)
   // try {
      // process file or upload to cloud storage
    fs.open(name, 'wx', (err, stream) => {
      if (err) {
        if (err.code === 'EEXIST') {
          console.error('myfile already exists');
          return;
        }

          throw err;
      }

      writeMyData(stream);
    });
      //result = await this.oss.put(name, stream);
    // } catch (err) {
    //   // must consume the stream, otherwise browser will be stuck.
    //   await sendToWormhole(stream);
    //   throw err;
    // }

    ctx.body = {
      url: stream.path,
      // process form fields by `stream.fields`
      fields: stream.fields,
    }
	
  }

  async uploadIndex(){
  	await this.ctx.render('upload');
  }

}


module.exports = NpmController;