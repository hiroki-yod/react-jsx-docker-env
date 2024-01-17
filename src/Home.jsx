/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./css/Home.css";
import facilities from "./dummies/facilities";


function Home() {
    const user = useSelector((state) => state.user.user);
    // ログイン中のユーザー情報
    const userInfo = ({ user }) => (
        user ? (
            <>
                <h2>ログイン中</h2>
                <ul>
                    <li>ID: {user.id}</li>
                    <li>Name: {user.name}</li>
                </ul>
            </>
        ) : null
    );
    const facilityItems = facilities.map((facility, index) => {
        return (
            <Link
                to={"/facility"}
                state={{ facility: facility }}
                key={facility.id || index}
            >
                <ul className="list-item">
                    <li>{facility.name}</li>
                    <li>{facility.address}</li>
                </ul>
            </Link>
        );
    });

    return (
        <>
            {userInfo({user})}
            <div className="facilities-list">
                <h2>施設一覧</h2>
                {facilityItems}
            </div>
        </>
    );
}

export default Home;
