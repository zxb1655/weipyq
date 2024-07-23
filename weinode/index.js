const express = require('express');
const app = express();
const cheerio = require('cheerio');
const request = require("request");
const fs = require("fs");
const path = require("path");

let cPage = 2
let cSize = 1
getAvatar(cPage,cSize)

function getAvatar(page,size) {
	let url = `https://www.woyaogexing.com/touxiang/weixin/index_${page}.html`
	request(url, async (err, response, body) => {
		const urlList = []
		const $ = cheerio.load(body);
		const imgArr = $('.lazy')
		for (let i = 0; i < imgArr.length; i++) {
			let imgUrl = imgArr[i].attribs.src
			saveImg(imgUrl, i + size)
		}
		if(cPage <= 40){
			cPage+=1
			cSize+=30
			getAvatar(cPage,cSize)
		}
	})
}

async function saveImg(url, i) {
	console.log(`正在保存${i}张图片`)
	let filename = `avatar-${i}.jpeg`;
	const writeStream = fs.createWriteStream("./public/avatar/" + filename);
	const readStream = await request("http:" + url)
	readStream.pipe(writeStream);
	readStream.on('end', function(response) {
		writeStream.end();
	});
}

let server = app.listen(3000);
