/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./css/Home.css";
import facilities from "./dummies/facilities";
import news from "./dummies/news";


function Home() {
    const user = useSelector((state) => state.user.user);
    // ログイン中のユーザー情報
    const userInfo = ({ user }) => (
        user ? (
            <>
                <ul>
                    <li>ID: {user.id}</li>
                    <li>Name: {user.name}</li>
                </ul>
            </>
        ) : null
    );
    const facilityItems = facilities.map((facility, index) => {
        return (
            <li key={facility.id || index}>
                <Link
                    to={"/facility"}
                    state={{ facility: facility }}
                >
                    {facility.name}
                </Link>
            </li>
        );
    });

    const lastThreeNews = news.slice(0, 3)
    const newsItems = lastThreeNews.map((newsItem, index) => {
        return (
            <li key={newsItem.id || index}>
                <Link
                    to={"/news_detail"}
                    state={{ newsItem: newsItem }}
                >
                    <li>{newsItem.title}</li>
                </Link>
            </li>
        );
    });

    return (
        <>
            <h2>ログイン中</h2>
            {userInfo({user})}
            <div className="facilities-list">
                <h2>施設一覧</h2>
                <ul className="list-item">
                    {facilityItems}
                </ul>
            </div>
            <div>
                <h2>最新のお知らせ</h2>
                <ul className="list-item">
                    {newsItems}
                </ul>
            </div>
            <Link
                to={"/news_list"}
            >
                お知らせ一覧へ
            </Link>
        </>
    );
}

export default Home;
