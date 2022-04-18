const fs = require('fs');
const bookingJsonFilePath = __dirname + "/bookingData.json"
console.log(bookingJsonFilePath);

console.log('clg test');

function readBookedSeats(apiKey) {
    return new Promise((resolve, reject) => {
        if (apiKey !== "YOUR_VERY_OWN_APIKEY") {
            reject({ msg: "API Key not valid" })
        }

        fs.readFile(bookingJsonFilePath, (err, data) => {
            if (err) {
                console.log('reading error');
                reject(err)
                return
            }
            const seats = JSON.parse(data.toString())
            // console.log(seats, 'seats');
            console.log('reading API');
            resolve(seats)
        })
    })
}


function writeBookedSeats(bookedArray, apiKey) {
    return new Promise((resolve, reject) => {
        if (apiKey !== "YOUR_VERY_OWN_APIKEY") {
            reject({ msg: "API Key not valid" })
        }

        const bookedJSONString = JSON.stringify(bookedArray, null, 2)
        fs.writeFile(bookingJsonFilePath, bookedJSONString, (err) => {
            if (err) reject(err)
            else resolve(bookedArray)
        })
    })

}

module.exports = { readBookedSeats, writeBookedSeats }

// console.log(bookingData);






// wie todosStorage!!


// +


// function MoviesAPI(api_key) {
//     if (api_key === "SECRET_MOVIE_API_KEY_123") {
//         return {readMovies}
//     } else {
//         return {
//             statusCode: 400,
//             status: "error",
//             message: "You must provide a valid api key!"
//         }
//     }
// }

// module.exports = MoviesAPI;