const {
	GraphQLNonNull,
	GraphQLString
} = require('graphql')

const db = require('../../../models/todolist/calendarEvent')
const { query_calendarEvent_feedback } = require('../types/calendarEvent')

module.exports = {
	type: query_calendarEvent_feedback,
	description: '查询提醒事件列表',
	args: {
		account: {
			name: 'account',
			type: new GraphQLNonNull(GraphQLString),
			description: '查询的用户'
		},
		typeID: {
			name: 'typeID',
			type: GraphQLString,
			description: '查询类别'
		},
		time: {
			name: 'name',
			type: GraphQLString,
			description: '查询时间: "2018-8"'
		}
	},
	resolve(root, qargs, req) {

		qargs.account = req.decoded ? req.decoded.user : qargs.account;

		let dataPromise = new Promise((resolve, reject) => {
			db.findOne(
				{
					account: qargs.account, 
					eventTypeID: qargs.typeID,
					time: qargs.time
				},
				{data: 1, time: 1, _id: 0},
				(err, data) => {
					
					if (err) {
						return reject(err);
					}

					console.log(data)

					resolve({
						time: data.time,
						day: JSON.stringify( data.data[0] )
					})
				}
			)
		})

		return dataPromise
	}
}

