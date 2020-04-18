const promise = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve({
			name: 'Cees',
			age: 20
		});
		// reject('Something went wrong')
	}, 5000);
});

promise.then((data) => {
	console.log('1', data);

	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('This is my other promise');
		}, 5000);
	});
}).then((str) => {
	console.log('does this run? ', str)
}).catch((error) => {
	console.log(error);
});