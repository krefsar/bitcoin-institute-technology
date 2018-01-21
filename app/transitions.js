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
	);

	this.transition(
		this.fromRoute('courses.index'),
		this.toRoute(['courses.coding', 'courses.daily-life']),
		this.use('explode', {
			matchBy: 'data-highlight-id',
			use: ['flyTo', {duration: 750}]
		}, {
			use: 'fade'
		}),
		this.reverse('explode', {
			matchBy: 'data-highlight-id',
			use: ['flyTo', {duration: 750}]
		}, {
			use: 'fade'
		})
	);

	this.transition(
		this.fromRoute('courses.coding.index'),
		this.toRoute('courses.coding.mining'),
		this.use('toLeft'),
		this.reverse('toRight')
	);

	this.transition(
		this.hasClass('appearing-result'),
		this.fromValue(false),
		this.toValue(true),
		this.use('toRight', { duration: 1000})
	);

	this.transition(
		this.hasClass('disappearing-cog'),
		this.fromValue(true),
		this.toValue(false),
		this.use('fade', { duration: 1500 })
	);
}
