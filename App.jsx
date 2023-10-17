import { useState, useEffect } from "react";
import './App.css'

const API_URL = "https://my-json-server.typicode.com/troy1129/jsonplaceholder/";

const busMappings = {
    1: 1,
    2: 1,
    3: 2,
    4: 2,
    5: 3,
    6: 3,
};

function App() {
    const [passengers, setPassengers] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [sales, setSales] = useState(0);
    const [bus, setBus] = useState([]);
    const [addPassenger, setAddPassenger] = useState({ id: "", name: "" });

    useEffect(() => {
        fetch(API_URL + 'passengers')
            .then((response) => response.json())
            .then((data) => setPassengers(data));

        fetch(API_URL + 'destinations')
            .then((response) => response.json())
            .then((data) => setDestinations(data));
    }, []);

    const addQueue = (passengerid, destinationid) => {
        const passenger = passengers[passengers.findIndex((pas) => pas.id === passengerid)];
        const destination = destinations[destinations.findIndex((des) => des.id === destinationid)];

        const busid = busMappings[destinationid];

        if (busid) {
            setSales(sales + destination.price);
            setBus([...bus, { busid: busid, ticketid: passengerid, name: passenger.name, destination: destination.destination }]);
            setPassengers(passengers.filter((pas) => pas.id !== passengerid));
        }
    };

    const submit = () => {
        setPassengers([...passengers, addPassenger]);
        setAddPassenger({ id: "", name: "" });
    };

    return (
        <>
            <h1 style={{ textAlign: "center" }}>Sales: PHP {sales}</h1>
            <label htmlFor="name">Name: </label>
            <input type="text" value={addPassenger.name} onChange={(e) => setAddPassenger({ ...addPassenger, name: e.target.value })} />
            <br />
            <label htmlFor="id">Ticket ID: </label>
            <input type="number" value={addPassenger.id} onChange={(e) => setAddPassenger({ ...addPassenger, id: e.target.value })} />
            <br />
            <button onClick={submit}>Submit</button>
            <div className="passengers">
                {passengers.map((pas) => (
                    <div key={pas.id} className="passenger-item">
                        ID: {pas.id}<br /><br />
                        {pas.name}<br /><br />
                        <div className="destination-list">
                            {destinations.map((des) => (
                                <button key={des.id} style={{ marginRight: 5 }} onClick={() => addQueue(pas.id, des.id)}>
                                    {des.destination}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="bus">
                {bus.map((o) => (
                    <div key={o.ticketid} className="order-item">
                        <b>Bus {o.busid}</b><br />
                        <div>
                            <p>ID: {o.ticketid}</p>
                            <p>{o.name}</p>
                            <p>{o.des}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default App;
