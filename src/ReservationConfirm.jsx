import { Link, useNavigate, useLocation } from "react-router-dom";

function ReservationConfirm() {
    const navigate = useNavigate();
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
                        Topへ
                    </Link>
                </button>
            </>
        );
    }

    const handleComplete = (e) => {
        e.preventDefault();
        navigate('/');
    };

    return (
        <>
            <h2>予約内容確認</h2>
            <p>{facility.name}</p>
            <p>{facility.address}</p>
            <button onClick={handleComplete}>
                予約実行
            </button>
        </>
    );
}

export default ReservationConfirm;
