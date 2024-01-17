import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from "./store/userSlice";

function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [loginMessage, setLoginMessage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 新規登録フォーム送信時
    const handleLogin = (e) => {
        e.preventDefault();

        // ダミーを作成して一時的にログインさせるだけ
        const user = {
            "id": 99,
            "name": name,
            "email": email,
            "password": password
        };
        if (password === password2) {
            // ログイン
            dispatch(logIn(user));
            navigate('/');
        } else {
            setLoginMessage("確認用パスワードが一致しません");
        }
    };
    return (
        <>
            <h2>新規登録</h2>
            <form onSubmit={handleLogin}>
                <label>
                    名前:
                    <input type="text" value={name} onChange={e => setName(e.target.value)} />
                </label>
                <br />
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
                <label>
                    パスワード（確認用）:
                    <input type="password" value={password2} onChange={e => setPassword2(e.target.value)} />
                </label>
                <br />
                <button type="submit">登録</button>
            </form>
            <p>{loginMessage}</p>
        </>
    );
}

export default SignUp;
