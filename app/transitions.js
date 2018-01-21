export default function(){
	this.transition(
		this.fromRoute('index'),
		this.toRoute('courses'),
		this.use('explode', {
			pickOld: '.landing__button',
			use: ['toDown', {duration: 1000}]
		}, {
			pickOld: '.landing__callout',
			use: ['crossFade', {duration: 1000}]
		}, {
			pickNew: '.courses__index',
			use: ['wait', 1000, {then: 'scale'}]
		})
	)
}
