import { Link, useNavigate, useLocation } from "react-router-dom";

function ReservationCalendar() {
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

    const handleNext = (e) => {
        e.preventDefault();
        navigate('/reservation_input', { state: {facility: facility} });
    };

    return (
        <>
            <h2>利用日</h2>
            <p>{facility.name}</p>
            <p>{facility.address}</p>
            <button onClick={handleNext}>
                決定
            </button>
        </>
    );
}

export default ReservationCalendar;
