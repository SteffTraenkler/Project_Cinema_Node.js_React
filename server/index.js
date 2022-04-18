const express = require("express")
const cors = require("cors")
const { body, validationResult } = require("express-validator")
const nodeId = require("node-id")
// const bookingData = require('./bookingData.json')
const { readBookedSeats, writeBookedSeats } = require('./bookingStorage')

// console.log(bookingData.length);

const dotenv = require('dotenv')
dotenv.config()

const PORT = 8089
const app = express()

app.use(cors())
app.use(express.json())

// const allseatsArr = BookingAPI(process.env.BOOKING_API_KEY)

app.use((req, _, next) => {
    console.log("new request -", req.method, req.url);
    next()
})

app.get('/', (_, res) => {
    res.send('Server is on and works :)')
})

const apiKey = process.env.BOOKING_API_KEY

//alle Sitze von Kino 1
app.get('/kino1/seats/all', (_, res) => {
    console.log('requested all seats');
    readBookedSeats(apiKey)
        .then(allSeatsArr => res.json(allSeatsArr))
})

//Sitze Loge und Parkett als Array (evtl als Query mal umschreiben?)
app.get('/kino1/seats/lower', (_, res) => {
    readBookedSeats(apiKey)
        .then(allSeatsArr => {
            let seatsFilter = allSeatsArr.filter(seats => seats.class.includes('Parkett'))
            // console.log(seatsFilter);
            res.json(seatsFilter)
        })
})

app.get('/kino1/seats/upper', (_, res) => {
    readBookedSeats(apiKey)
        .then(allSeatsArr => {
            let seatsFilter = allSeatsArr.filter(seats => seats.class.includes('Loge'))
            // console.log(seatsFilter);
            res.json(seatsFilter)
        })
        .catch(_ => res.status(500).json({ err: "Unknown error while reading allArray." }))
})

//booking seats
app.put('/kino1/seats/updateStatus', (req, res) => {
    const targetID = req.body.id
    const booked = req.body.booked

    readBookedSeats(apiKey)
        .then(bookedSeats => {
            const updatedSeatsArray =
                bookedSeats.map((seats) => {
                    if (seats.id === targetID) {
                        return { ...seats, booked: booked }
                    } else {
                        return seats
                    }
                })
            return updatedSeatsArray
        })
        .then((updatedSeatsArray) => writeBookedSeats(updatedSeatsArray, apiKey))
        .then((writtenSeatsArray) => res.json(writtenSeatsArray))
        .catch(_ => res.status(500).json({ err: "Unknown error while overwriting booked of seat" }))
})


app.put('/kino1/seats/resetStatus', (req, res) => {
    // const targetID = req.body.id
    // const booked = req.body.booked

    readBookedSeats(apiKey)
        .then(bookedSeats => {
            const updatedSeatsArray =
                bookedSeats.map((seats) => {
                    if (seats.booked) {
                        return { ...seats, booked: false }
                    } else {
                        return seats
                    }
                })
            return updatedSeatsArray
        })
        .then((updatedSeatsArray) => writeBookedSeats(updatedSeatsArray, apiKey))
        .then((writtenSeatsArray) => res.json(writtenSeatsArray))
        .catch(_ => res.status(500).json({ err: "Unknown error while overwriting booked of seat" }))
})

//Error Handling
app.use((_, res) => {
    res.status(404).json({ err: "Not found." })
})

app.listen(PORT, () => console.log('Server listening on port', PORT))