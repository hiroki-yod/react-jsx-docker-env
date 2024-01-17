import "./css/App.css";
import { useSelector } from "react-redux";
import { Link, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Mypage from "./Mypage"
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import Facility from "./Facility";
import ReservationCalendar from "./ReservationCalendar";
import ReservationInput from "./ReservationInput";
import ReservationConfirm from "./ReservationConfirm";

// マイページボタン
// eslint-disable-next-line react/prop-types
function MypageButton({ user }) {
    if (user) {
        return (
            <button>
                <Link
                    to={"/mypage"}
                    state={{ user: user }}
                    key={"mypage"}
                >
                    マイページ
                </Link>
            </button>
        );
    } else {
        return (
            <button>
                <Link
                    to={"/log_in"}
                    key={"log_in"}
                >
                    ログイン・新規登録
                </Link>
            </button>
        );
    }
}

export default function App() {
    const user = useSelector((state) => state.user.user);
    return (
        <div className="App">
            <header className="App-header">
                <h2>
                    <a href="/">スカラ市施設予約デモサイト</a>
                    <MypageButton user={user} />
                </h2>
                
            </header>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/mypage" element={<Mypage />} />
                <Route path="/sign_up" element={<SignUp />} />
                <Route path="/log_in" element={<LogIn />} />
                <Route path="/facility" element={<Facility />} />
                <Route
                    path="/reservation_calendar"
                    element={<ReservationCalendar />}
                />
                <Route
                    path="/reservation_input"
                    element={<ReservationInput />}
                />
                <Route
                    path="/reservation_confirm"
                    element={<ReservationConfirm />}
                />
            </Routes>
        </div>
    );
}
