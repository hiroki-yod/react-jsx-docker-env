import { Link, useNavigate } from "react-router-dom";
import news from "./dummies/news";

function NewsList() {
    const navigate = useNavigate();
    const newsItems = news.map((newsItem, index) => {
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

    const goBack = () => {
        navigate(-1); // 1つ前のページに戻る
    };

    return (
        <>
            <div>
                <h2>お知らせ一覧</h2>
                <ul className="list-item">
                    {newsItems}
                </ul>
            </div>
            <button onClick={goBack}>戻る</button>
        </>
    );
}

export default NewsList;
