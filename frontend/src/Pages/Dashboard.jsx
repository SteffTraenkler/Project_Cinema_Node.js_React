

export default function Dashboard(props) {
    let seats = props.seats
    // console.log(seats);
    const resetSeats = () => {
        fetch("http://localhost:8089/kino1/seats/resetStatus", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ seats })
        }).then(resp => resp.json())
            .then((updatedBooks) => props.setSeats(updatedBooks))
    }

    let freeSeats = seats.filter(s => !s.booked)

    let bookedSeats = seats.filter(s => Boolean(s.booked))
    // console.log(bookedSeats.length);
    let priceArray = () => {
        if (bookedSeats.length > 0) {
            let pArr = bookedSeats.map(e => e.admin_price)
            // console.log('if Book>0');
            let priceTotal = pArr.reduce(function (prevVal, currVal) {
                return prevVal + currVal
            })
            return priceTotal
        } else {
            return '0'
        }
    }

    // console.log(priceArray());

    return (
        <div className="dahsboardDiv">
            <h1>This is your Dashboard</h1>
            <div>
                <h3>Freie Plätze</h3>
                <h1>{freeSeats.length}</h1>
            </div>
            <div>
                <h3>Umsatz</h3>
                <h1>{priceArray() + '€'}</h1>
            </div>
            <button onClick={resetSeats}>Reset Booking</button>

        </div>
    )
}
