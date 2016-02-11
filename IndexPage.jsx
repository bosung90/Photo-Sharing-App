Photos = new Mongo.Collection('photos')

IndexPage = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		return {
			photos: Photos.find({}).fetch()
		}
	},
	renderPhoto(){
		if(this.data.photos.length > 0) {
			return (
				<div>
					{/*this.data.photos[0].photo*/}
					<img width={300} src={this.data.photos[0].photo} />
				</div>
			)
		}
	},
	photoInputOnChange() {
		console.log(this.refs.photoInput.value)
		let files = this.refs.photoInput.files
		if( files && files[0]) {
			let FR = new FileReader()
			FR.onload = (data) => {
				if(this.data.photos.length > 0) {
					Photos.update(this.data.photos[0]._id, {$set: {photo: data.target.result}})
				} else {
					Photos.insert({photo: data.target.result})
				}
			}
			FR.readAsDataURL( files[0] )
		}
	},
	render() {
		return (
			<div>
				{this.renderPhoto()}
				<input type='file' ref='photoInput' onChange={this.photoInputOnChange} />
			</div>
		)
	}
})
