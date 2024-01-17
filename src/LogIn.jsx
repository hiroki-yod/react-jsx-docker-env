import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from "./store/userSlice";
import users from "./dummies/users";

function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginMessage, setLoginMessage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // ログインフォーム送信
    const handleLogin = (e) => {
        e.preventDefault();

        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            // ログイン
            dispatch(logIn(user));
            navigate('/');
        } else {
            setLoginMessage('ユーザーが見つかりません。');
        }
    };
    return (
        <>
            <h2>ログイン</h2>
            <form onSubmit={handleLogin}>
                <label>
                    メールアドレス:
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                </label>
                <br />
                <label>
                    パスワード:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <br />
                <button type="submit">ログイン</button>
            </form>
            <p>{loginMessage}</p>
            <button>
                <Link
                    to={"/sign_up"}
                    key={"sign_up"}
                >
                    新規登録
                </Link>
            </button>
        </>
    );
}

export default LogIn;
