/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./css/Home.css";
import facilities from "./dummies/facilities";

function User({ user }) {
    if (user) {
        return (
            <>
                <h2>ログイン中</h2>
                <ul>
                    <li>ID: {user.id}</li>
                    <li>Name: {user.name}</li>
                </ul>
            </>
        );
    } else {
        return null;
    }
}

function Home() {
    const user = useSelector((state) => state.user.user);
    const items = facilities.map((facility, index) => {
        return (
            <>
                <Link
                    to={"/facility"}
                    state={{ facility: facility }}
                    key={index}
                >
                    <ul className="list-item">
                        <li>{facility.name}</li>
                        <li>{facility.address}</li>
                    </ul>
                </Link>
            </>
        );
    });

    return (
        <>
            <User user={user}/>
            <div className="facilities-list">
                <h2>施設一覧</h2>
                {items}
            </div>
        </>
    );
}

export default Home;
