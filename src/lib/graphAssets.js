const configuration = {
	toImageButtonOptions: {
		format: 'png', // one of png, svg, jpeg, webp
		filename: 'custom_image',
		height: 500,
		width: 700,
		scale: 1, // Multiply title/legend/axis/canvas sizes by this factor
	},
	modeBarButtonsToRemove: [
		'sendDataToCloud',
		'editInChartStudio',
		'zoom2d',
		'pan2d',
		'select2d',
		'lasso2d',
		'zoomIn2d',
		'zoomOut2d',
		'autoScale2d',
		'resetScale2d',
		'hoverClosestCartesian',
		'toggleSpikelines',
		'hoverCompareCartesian',
	],
	displaylogo: false,
	responsive: true,
};
const barColor = [
	'rgba(63,191,127,0.5)','rgba(63,191,127,0.55)','rgba(63,191,127,0.6)','rgba(63,191,127,0.65)','rgba(63,191,127,0.7)','rgba(63,191,127,0.75)','rgba(63,191,127,0.8)',
	'rgba(63,127,191,0.5)','rgba(63,127,191,0.55)','rgba(63,127,191,0.6)','rgba(63,127,191,0.65)','rgba(63,127,191,0.7)','rgba(63,127,191,0.75)','rgba(63,127,191,0.8)',
	'rgba(63,191,127,0.5)','rgba(63,191,127,0.55)','rgba(63,191,127,0.6)','rgba(63,191,127,0.65)','rgba(63,191,127,0.7)','rgba(63,191,127,0.75)','rgba(63,191,127,0.8)',
	'rgba(63,127,191,0.5)','rgba(63,127,191,0.55)','rgba(63,127,191,0.6)','rgba(63,127,191,0.65)','rgba(63,127,191,0.7)','rgba(63,127,191,0.75)','rgba(63,127,191,0.8)',
	'rgba(63,191,127,0.5)','rgba(63,191,127,0.55)','rgba(63,191,127,0.6)','rgba(63,191,127,0.65)','rgba(63,191,127,0.7)','rgba(63,191,127,0.75)','rgba(63,191,127,0.8)',
	'rgba(63,127,191,0.5)','rgba(63,127,191,0.55)','rgba(63,127,191,0.6)','rgba(63,127,191,0.65)','rgba(63,127,191,0.7)','rgba(63,127,191,0.75)','rgba(63,127,191,0.8)',
	'rgba(63,191,127,0.5)','rgba(63,191,127,0.55)','rgba(63,191,127,0.6)','rgba(63,191,127,0.65)','rgba(63,191,127,0.7)','rgba(63,191,127,0.75)','rgba(63,191,127,0.8)',
	'rgba(63,127,191,0.5)','rgba(63,127,191,0.55)','rgba(63,127,191,0.6)','rgba(63,127,191,0.65)','rgba(63,127,191,0.7)','rgba(63,127,191,0.75)','rgba(63,127,191,0.8)',
	'rgba(63,191,127,0.5)','rgba(63,191,127,0.55)','rgba(63,191,127,0.6)','rgba(63,191,127,0.65)','rgba(63,191,127,0.7)','rgba(63,191,127,0.75)','rgba(63,191,127,0.8)',
	'rgba(63,127,191,0.5)','rgba(63,127,191,0.55)','rgba(63,127,191,0.6)','rgba(63,127,191,0.65)','rgba(63,127,191,0.7)','rgba(63,127,191,0.75)','rgba(63,127,191,0.8)',
	'rgba(63,191,127,0.5)','rgba(63,191,127,0.55)','rgba(63,191,127,0.6)','rgba(63,191,127,0.65)','rgba(63,191,127,0.7)','rgba(63,191,127,0.75)','rgba(63,191,127,0.8)',
	'rgba(63,127,191,0.5)','rgba(63,127,191,0.55)','rgba(63,127,191,0.6)','rgba(63,127,191,0.65)','rgba(63,127,191,0.7)','rgba(63,127,191,0.75)','rgba(63,127,191,0.8)',
	'rgba(63,191,127,0.5)','rgba(63,191,127,0.55)','rgba(63,191,127,0.6)','rgba(63,191,127,0.65)','rgba(63,191,127,0.7)','rgba(63,191,127,0.75)','rgba(63,191,127,0.8)',
	'rgba(63,127,191,0.5)','rgba(63,127,191,0.55)','rgba(63,127,191,0.6)','rgba(63,127,191,0.65)','rgba(63,127,191,0.7)','rgba(63,127,191,0.75)','rgba(63,127,191,0.8)',
	'rgba(63,191,127,0.5)','rgba(63,191,127,0.55)','rgba(63,191,127,0.6)','rgba(63,191,127,0.65)','rgba(63,191,127,0.7)','rgba(63,191,127,0.75)','rgba(63,191,127,0.8)',
	'rgba(63,127,191,0.5)','rgba(63,127,191,0.55)','rgba(63,127,191,0.6)','rgba(63,127,191,0.65)','rgba(63,127,191,0.7)','rgba(63,127,191,0.75)','rgba(63,127,191,0.8)',
	'rgba(63,191,127,0.5)','rgba(63,191,127,0.55)','rgba(63,191,127,0.6)','rgba(63,191,127,0.65)','rgba(63,191,127,0.7)','rgba(63,191,127,0.75)','rgba(63,191,127,0.8)',
	'rgba(63,127,191,0.5)','rgba(63,127,191,0.55)','rgba(63,127,191,0.6)','rgba(63,127,191,0.65)','rgba(63,127,191,0.7)','rgba(63,127,191,0.75)','rgba(63,127,191,0.8)',
	'rgba(63,191,127,0.5)','rgba(63,191,127,0.55)','rgba(63,191,127,0.6)','rgba(63,191,127,0.65)','rgba(63,191,127,0.7)','rgba(63,191,127,0.75)','rgba(63,191,127,0.8)',
	'rgba(63,127,191,0.5)','rgba(63,127,191,0.55)','rgba(63,127,191,0.6)','rgba(63,127,191,0.65)','rgba(63,127,191,0.7)','rgba(63,127,191,0.75)','rgba(63,127,191,0.8)',
	'rgba(63,191,127,0.5)','rgba(63,191,127,0.55)','rgba(63,191,127,0.6)','rgba(63,191,127,0.65)','rgba(63,191,127,0.7)','rgba(63,191,127,0.75)','rgba(63,191,127,0.8)',
	'rgba(63,127,191,0.5)','rgba(63,127,191,0.55)','rgba(63,127,191,0.6)','rgba(63,127,191,0.65)','rgba(63,127,191,0.7)','rgba(63,127,191,0.75)','rgba(63,127,191,0.8)',
	'rgba(63,191,127,0.5)','rgba(63,191,127,0.55)','rgba(63,191,127,0.6)','rgba(63,191,127,0.65)','rgba(63,191,127,0.7)','rgba(63,191,127,0.75)','rgba(63,191,127,0.8)',
	'rgba(63,127,191,0.5)','rgba(63,127,191,0.55)','rgba(63,127,191,0.6)','rgba(63,127,191,0.65)','rgba(63,127,191,0.7)','rgba(63,127,191,0.75)','rgba(63,127,191,0.8)',
	'rgba(63,191,127,0.5)','rgba(63,191,127,0.55)','rgba(63,191,127,0.6)','rgba(63,191,127,0.65)','rgba(63,191,127,0.7)','rgba(63,191,127,0.75)','rgba(63,191,127,0.8)',
	'rgba(63,127,191,0.5)','rgba(63,127,191,0.55)','rgba(63,127,191,0.6)','rgba(63,127,191,0.65)','rgba(63,127,191,0.7)','rgba(63,127,191,0.75)','rgba(63,127,191,0.8)',
	'rgba(63,191,127,0.5)','rgba(63,191,127,0.55)','rgba(63,191,127,0.6)','rgba(63,191,127,0.65)','rgba(63,191,127,0.7)','rgba(63,191,127,0.75)','rgba(63,191,127,0.8)',
	'rgba(63,127,191,0.5)','rgba(63,127,191,0.55)','rgba(63,127,191,0.6)','rgba(63,127,191,0.65)','rgba(63,127,191,0.7)','rgba(63,127,191,0.75)','rgba(63,127,191,0.8)',
	'rgba(63,191,127,0.5)','rgba(63,191,127,0.55)','rgba(63,191,127,0.6)','rgba(63,191,127,0.65)','rgba(63,191,127,0.7)','rgba(63,191,127,0.75)','rgba(63,191,127,0.8)',
	'rgba(63,127,191,0.5)','rgba(63,127,191,0.55)','rgba(63,127,191,0.6)','rgba(63,127,191,0.65)','rgba(63,127,191,0.7)','rgba(63,127,191,0.75)','rgba(63,127,191,0.8)',
	'rgba(63,191,127,0.5)','rgba(63,191,127,0.55)','rgba(63,191,127,0.6)','rgba(63,191,127,0.65)','rgba(63,191,127,0.7)','rgba(63,191,127,0.75)','rgba(63,191,127,0.8)',
	'rgba(63,127,191,0.5)','rgba(63,127,191,0.55)','rgba(63,127,191,0.6)','rgba(63,127,191,0.65)','rgba(63,127,191,0.7)','rgba(63,127,191,0.75)','rgba(63,127,191,0.8)',
	'rgba(63,191,127,0.5)','rgba(63,191,127,0.55)','rgba(63,191,127,0.6)','rgba(63,191,127,0.65)','rgba(63,191,127,0.7)','rgba(63,191,127,0.75)','rgba(63,191,127,0.8)',
	'rgba(63,127,191,0.5)','rgba(63,127,191,0.55)','rgba(63,127,191,0.6)','rgba(63,127,191,0.65)','rgba(63,127,191,0.7)','rgba(63,127,191,0.75)','rgba(63,127,191,0.8)',
	'rgba(63,191,127,0.5)','rgba(63,191,127,0.55)','rgba(63,191,127,0.6)','rgba(63,191,127,0.65)','rgba(63,191,127,0.7)','rgba(63,191,127,0.75)','rgba(63,191,127,0.8)',
	'rgba(63,127,191,0.5)','rgba(63,127,191,0.55)','rgba(63,127,191,0.6)','rgba(63,127,191,0.65)','rgba(63,127,191,0.7)','rgba(63,127,191,0.75)','rgba(63,127,191,0.8)',
	'rgba(63,191,127,0.5)','rgba(63,191,127,0.55)','rgba(63,191,127,0.6)','rgba(63,191,127,0.65)','rgba(63,191,127,0.7)','rgba(63,191,127,0.75)','rgba(63,191,127,0.8)',
	'rgba(63,127,191,0.5)','rgba(63,127,191,0.55)','rgba(63,127,191,0.6)','rgba(63,127,191,0.65)','rgba(63,127,191,0.7)','rgba(63,127,191,0.75)','rgba(63,127,191,0.8)',
	];
	
export {configuration, barColor}