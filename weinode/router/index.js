const multiparty = require('connect-multiparty')
const multipartyMiddleware = new multiparty()
const controller = require('../controller/index.js')

module.exports = (app) => {
	app.get('/getWeiDate', async (req, res) => {
		const url = req.query.url
		let data = await controller.weiDateControl(url)
		res.send(data)
	});
	app.post('/uploadWorkPicture', multipartyMiddleware, async (req, res)=> {
		const uploadedImage = req.files['upload-images']
		const data = await controller.uploadControl(uploadedImage)
		res.send(data)
	})

	app.get('/deleteWorkPicture', async (req, res) => {
		const str = req.query.imagePath
		const data = await controller.deleteControl(str)
		res.send(data)
	})
}
