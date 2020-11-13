const reorderDate = (str) =>str.split("-").reverse().join("-");

const withLocalTime = (date) =>{
	const local_time = new Date(date).toJSON();
	return local_time?reorderDate(local_time.slice(0,10)) + ' '+ local_time.slice(11,19):'';
}

export {reorderDate, withLocalTime}