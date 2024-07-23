const cheerio = require('cheerio');
const request = require("request");
const fs = require("fs");
const path = require("path");

class Controller {	
	saveImg(url) {
		return new Promise((resolve, reject) => {
			let filename = `article-${Date.now()}.jpeg`;
			const writeStream = fs.createWriteStream("./public/article/" + filename);
			const readStream = request(url)
			readStream.pipe(writeStream);
			writeStream.on('finish', function(response) {
				writeStream.end();
				resolve(`https://weiapi.jzzz66.cn/article/${filename}`)
			});
		})
	}

	weiDateControl(url) {
		return new Promise((resolve, reject) => {
			request(url, async (err, response, body) => {
				const data = {}
				const $ = cheerio.load(body);
				data.title = $("meta[property=og:title]").attr('content');
				const imgUrl = $("meta[property=og:image]").attr("content");
				data.imgUrl = await this.saveImg(imgUrl)
				resolve(data)
			})
		})
	}
	
	uploadControl(uploadedImage){
		return new Promise((resolve,reject)=>{
			let str = uploadedImage.name
			let name 
			if(str.indexOf(".") != -1){
				name = `${new Date().getTime()}_${str}`
			} else {
				name = `${new Date().getTime()}_${str}.jpeg`
			}
			const readStream = fs.createReadStream(uploadedImage.path)
			const writeStream = fs.createWriteStream("./public/image/" + name);
			readStream.pipe(writeStream)	
			writeStream.on('finish', function() {
				fs.unlinkSync(uploadedImage.path)
				resolve('https://weiapi.jzzz66.cn/image/' + name)
			})
		})
	}
	
	deleteControl(str){
		return new Promise((resolve,reject)=>{
			const serverPrefix = 'https://weiapi.jzzz66.cn/image/'
			const filePath = path.resolve(__dirname , `../public/image/${str.replace(serverPrefix, '')}`)
			fs.unlink(filePath, function(err) {
				if (err) {
					resolve({
						errcode: 1,
						errmsg: err.message
					})
				} else {
					resolve({
						errcode: 0,
						errmsg: 'success to delete image: ' + str
					})
				}
			})
		})
	}
}

module.exports = new Controller()
