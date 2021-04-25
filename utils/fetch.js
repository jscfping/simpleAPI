fetch('http://localhost:3000/scores')
    .then(function (response) {
        return response.json();
    })
    .then(data => console.log(data.calculus))



fetch('http://localhost:3000/scores', {
    body: `${encodeURIComponent('subject')}=${encodeURIComponent('abc')}&${encodeURIComponent('scores')}=${encodeURIComponent(999)}`,
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
})
    .then(function (response) {
        return response.json();
    })
    .then(data => console.log(data))
