import { Link, useLocation, useNavigate } from "react-router-dom";

function NewsDetail() {
    const navigate = useNavigate();
    const location = useLocation();
    const newsItem = location.state && location.state.newsItem ? location.state.newsItem : null;

    if (newsItem === null) {
        return (
            <>
                <h3>最初からやり直してください</h3>
                <button>
                    <Link
                        to={"/"}
                    >
                        Topへ
                    </Link>
                </button>
            </>
        );
    }

    const goBack = () => {
        navigate(-1); // 1つ前のページに戻る
    };

    return (
        <>
            <h2>{newsItem.title}</h2>
            <p>{newsItem.datetime}</p>
            <p>{newsItem.content}</p>
            <button onClick={goBack}>戻る</button>
        </>
    );
}

export default NewsDetail;
