import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Facility() {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);
    const location = useLocation();
    const facility = location.state && location.state.facility ? location.state.facility : null;

    if (facility === null) {
        return (
            <>
                <h3>最初からやり直してください</h3>
                <button>
                    <Link
                        to={"/"}
                    >
                        トップへ
                    </Link>
                </button>
            </>
        );
    }

    // 予約へ進む
    const handleReservation = (e) => {
        e.preventDefault();
        if (user) {
            // ログインしていれば予約画面へ
            navigate('/reservation_calendar', { state: {facility: facility} });
        } else {
            // ログインしていなければログイン画面へ
            navigate('/log_in');
        }
    };

    return (
        <>
            <h2>施設詳細</h2>
            <p>{facility.name}</p>
            <p>{facility.address}</p>
            <p>{facility.description}</p>
            <button onClick={handleReservation}>
                予約
            </button>
        </>
    );
}

export default Facility;
