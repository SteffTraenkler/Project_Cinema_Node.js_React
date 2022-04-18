import Kino1 from "./Kino1";

export default function Home(props) {

    return (
        <div className="App">
            <Kino1 seats={props.seats} setSeats={props.setSeats} />
        </div>
    )
}