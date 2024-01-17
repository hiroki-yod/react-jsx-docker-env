import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "./store/userSlice";

function Mypage() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user) || null;

    if (user === null) {
        return (
            <>
                <h3>ログイン直してください</h3>
                <button>
                    <Link
                        to={"/log_in"}
                    >
                        ログインページへ
                    </Link>
                </button>
            </>
        );
    }

    const handleClickLogOut = () => {
        // ログアウト
        dispatch(logOut());
    };

    return (
        <>
            <h2>マイページ</h2>
            <p>ID: {user.id}</p>
            <p>名前: {user.name}</p>
            <p>メールアドレス: {user.email}</p>
            <button onClick={handleClickLogOut}>
                <Link
                    to={"/log_in"}
                    key={"log_in"}
                >
                    ログアウト
                </Link>
            </button>
            <button>
                <Link
                    to={"/"}
                    key={"home"}
                >
                    トップへ
                </Link>
            </button>
        </>
    );
}

export default Mypage;
