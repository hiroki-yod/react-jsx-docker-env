import { Link, useNavigate, useLocation } from "react-router-dom";
import reservationFrames from "./dummies/reservationFrames";


function ReservationConfirm() {
    const navigate = useNavigate();
    const location = useLocation();
    const facility = location.state && location.state.facility ? location.state.facility : null;
    const reservationFrameIds = location.state && location.state.reservationFrames ? location.state.reservationFrames : null;
    const userCount = location.state && location.state.userCount ? location.state.userCount : null;
    const isCitizen = location.state && location.state.isCitizen ? location.state.isCitizen : null;
    const ageClass = location.state && location.state.ageClass ? location.state.ageClass : null;

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

    const datetimeComponent = () => {
        reservationFrameIds.map(frameId => {
            <li key={frameId}>{reservationFrames.find(frame => frame.id === frameId)}</li>
        })
    }

    const isCitizenComponent = () => {
        if (isCitizen) {
            return (
                <p>市内</p>
            )
        } else {
            return (
                <p>市外</p>
            )
        }
    }

    const ageClassComponent = () => {
        if (ageClass === "highSchoolStudentOrLess") {
            return (
                <p>高校生以下</p>
            )
        } else if (ageClass === "60YearsOldOrMore") {
            return (
                <p>60歳以上</p>
            )
        } else {
            return (
                <p>その他</p>
            )
        }
    }

    const handleComplete = (e) => {
        e.preventDefault();
        navigate('/');
    };

    const goBack = () => {
        navigate(-1); // 1つ前のページに戻る
    };
    console.log(reservationFrames.find(frame => frame.id === 1))

    return (
        <>
            <h2>予約内容確認</h2>
            <h4>施設</h4>
            <p>{facility.name}</p>
            <h4>時間</h4>
            {datetimeComponent}
            <h4>ご利用人数</h4>
            <p>{userCount}</p>
            <h4>お住まい</h4>
            {isCitizenComponent()}
            <h4>年齢区分</h4>
            {ageClassComponent()}
            <button onClick={handleComplete}>
                予約実行
            </button>
            <p>（デモアプリなので実際には保存されません）</p>
            <button onClick={goBack}>戻る</button>
        </>
    );
}

export default ReservationConfirm;
