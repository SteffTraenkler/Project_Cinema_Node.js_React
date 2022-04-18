import SeatsLow from "../componentsKino1/seatsLow";
import SeatsUpper from "../componentsKino1/seatUpper";
import { useState, useEffect } from "react";

export default function Kino1(props) {

    const [seatsLow, setSeatsLow] = useState([])
    const [seatUp, setSeatsUp] = useState([])

    useEffect(() => {
        fetch('http://localhost:8089/kino1/seats/lower')
            .then((resp) => resp.json())
            .then(parkettSeats => {
                setSeatsLow(parkettSeats)
            })
    }, [props.seats])

    useEffect(() => {
        fetch('http://localhost:8089/kino1/seats/upper')
            .then((resp) => resp.json())
            .then(parkettSeats => {
                setSeatsUp(parkettSeats)
            })
    }, [props.seats])

    return (
        <div className="App">
            <h1>helloo</h1>
            <img src="" alt="" />
            <SeatsUpper seats={props.seats} setSeats={props.setSeats} seatUp={seatUp} setSeatsUp={setSeatsUp} />
            <SeatsLow seatsLow={seatsLow} setSeatsLow={setSeatsLow} seats={props.seats} setSeats={props.setSeats} />
            <div className="screenDiv">Leinwand</div>
        </div>
    )
}