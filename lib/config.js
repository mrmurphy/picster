module.exports = {
	db: 'picster',
	test: {
		db: 'picster_test'
	},
  plApiKey: process.env.PICTURELIFE_API_KEY || null,
  chunkSize: 200
}
