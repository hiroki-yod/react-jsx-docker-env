import { Link, useNavigate, useLocation } from "react-router-dom";
import reservationFrames from "./dummies/reservationFrames";


function ReservationConfirm() {
    const navigate = useNavigate();
    const location = useLocation();
    const facility = location.state && location.state.facility ? location.state.facility : null;
    const reservationFrameIds = location.state && location.state.reservationFrames ? location.state.reservationFrames : null;
    const options = location.state && location.state.options ? location.state.options : null;
    const optionsCount = location.state && location.state.optionsCount ? location.state.optionsCount : null;
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

    const datetimeComponent = reservationFrameIds.map(frameId => {
        const reservationFrame = reservationFrames.find(frame => frame.id === parseInt(frameId));
        return (
            <li key={frameId}>{reservationFrame.datetime}</li>
        );
    })

    const optionsComponent = options.map(option => {
        const optionCount = optionsCount[option.id]
        return (
            <p key={option.id}>{option.name} × {optionCount}</p>
        );
    })

    const isCitizenComponent = () => {
        if (isCitizen) {
            return (
                <p>市内</p>
            );
        } else {
            return (
                <p>市外</p>
            );
        }
    }

    const ageClassComponent = () => {
        if (ageClass === "highSchoolStudentOrLess") {
            return (
                <p>高校生以下</p>
            );
        } else if (ageClass === "60YearsOldOrMore") {
            return (
                <p>60歳以上</p>
            );
        } else {
            return (
                <p>その他</p>
            );
        }
    }
    // 料金計算ロジックはここ
    const fee = () => {
        const facilityFee = facility.hourlyFee * reservationFrameIds.length;
        const optionFee = options.reduce((acc, option) => {
            const optionCount = optionsCount[option.id] || 0;
            return acc + (option.fee * optionCount);
        }, 0);
        return <p>{facilityFee + optionFee}円</p>;
    }

    const handleComplete = (e) => {
        e.preventDefault();
        navigate('/');
    };

    const goBack = () => {
        navigate(-1); // 1つ前のページに戻る
    };

    return (
        <>
            <h2>予約内容確認</h2>
            <h4>施設</h4>
            <p>{facility.name}</p>
            <h4>時間</h4>
            {datetimeComponent}
            <h4>備品</h4>
            {optionsComponent}
            <h4>ご利用人数</h4>
            <p>{userCount}</p>
            <h4>お住まい</h4>
            {isCitizenComponent()}
            <h4>年齢区分</h4>
            {ageClassComponent()}
            <h4>料金</h4>
            {fee()}
            <button onClick={handleComplete}>
                予約実行
            </button>
            <p>（デモアプリなので実際には保存されません）</p>
            <button onClick={goBack}>戻る</button>
        </>
    );
}

export default ReservationConfirm;
