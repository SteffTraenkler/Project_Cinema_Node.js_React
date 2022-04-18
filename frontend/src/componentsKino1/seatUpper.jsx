import UpperSeatSingle from "./upperSeatSingle";

export default function SeatsUpper(props) {
    // console.log(props.seats);
    return (
        <div className="lower">
            {/* <h1>upper seats</h1> */}
            <div>
                {props.seatUp.map(seats => <UpperSeatSingle seats={seats} setSeats={props.setSeats} key={seats.id} />)}

            </div>
        </div>
    )
}
