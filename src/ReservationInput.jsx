import { Link, useNavigate, useLocation } from "react-router-dom";

function ReservationInput() {
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

    const handleConfirm = (e) => {
        e.preventDefault();
        navigate('/reservation_confirm', { state: {facility: facility} });
    };

    return (
        <>
            <h2>予約情報</h2>
            <p>{facility.name}</p>
            <p>{facility.address}</p>
            <button onClick={handleConfirm}>
                決定
            </button>
        </>
    );
}

export default ReservationInput;
