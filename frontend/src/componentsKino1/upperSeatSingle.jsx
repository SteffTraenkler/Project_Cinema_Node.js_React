export default function UpperSeatSingle(props) {

    const updateBookingSeat = () => {
        fetch("http://localhost:8089/kino1/seats/updateStatus", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: props.seats.id, booked: true })
        }).then(resp => resp.json())
            .then((updatedBooks) => props.setSeats(updatedBooks))
    }


    return (
        <div onClick={props.seats.booked ? null : updateBookingSeat} className={props.seats.booked ? "bookedSeatDiv" : "UpperSeatDiv"} key={props.seats.id}>
            <h1>{props.seats.id}</h1>
            <h2>{props.seats.booked}</h2>
        </div>
    )

}