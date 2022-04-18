import LowerSeatSingle from "./lowerSeatSingle";

export default function SeatsLow(props) {
    return (
        <div className="lower">
            {/* <h1>lower seats</h1> */}
            <div>
                {props.seatsLow.map(seats => <LowerSeatSingle seats={seats} setSeats={props.setSeats} key={seats.id} />)}
            </div>
        </div>
    )
}