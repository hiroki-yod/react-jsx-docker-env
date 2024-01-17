import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function ReservationInput() {
    const navigate = useNavigate();
    const location = useLocation();
    const facility = location.state && location.state.facility ? location.state.facility : null;
    const frames = location.state && location.state.reservationFrame ? location.state.reservationFrame : null;
    const [selectedFrames, setSelectedFrames] = useState([]);
    const [userCount, setUserCount] = useState(1);
    const [isCitizen, setIsCitizen] = useState(false);
    const [ageClass, setAgeClass] = useState("other");
    
    if (facility === null || frames === null) {
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

    // 時間帯選択
    const handleSelectFrame = (e) => {
        const selectedFrameId = e.target.value;
        setSelectedFrames(prevSelectedFrames => {
            // チェックボックスが選択された場合
            if (e.target.checked) {
                // 選択されたIDを追加
                return [...prevSelectedFrames, selectedFrameId];
            } else {
                // 選択が解除された場合、そのIDを削除
                return prevSelectedFrames.filter(id => id !== selectedFrameId);
            }
        });
    };
    // 時間帯選択肢生成
    const checkboxItems = frames.map(frame => 
        frame.userId === null && (
            <div key={frame.id}>
                <label>
                    <input
                        type="checkbox"
                        value={frame.id}
                        checked={selectedFrames.includes(frame.id.toString())}
                        onChange={handleSelectFrame}
                    />
                    {frame.datetime}
                </label>
            </div>
        )
    );
    // 人数の入力処理
    const handleUserCountChange = (e) => {
        const count = parseInt(e.target.value, 10);
        if (!isNaN(count) && count >= 0) {
            setUserCount(count);
        }
    };
    // お住まい選択
    const handleSelectIsCitizen = (e) => {
        setIsCitizen(e.target.value === '市内');
    };
    // 年齢区分選択
    const handleSelectAgeClass = (e) => {
        setAgeClass(e.target.value);
    };
    // 確定
    const handleConfirm = (e) => {
        e.preventDefault();
        navigate('/reservation_confirm', { state: {
            facility: facility,
            reservationFrames: selectedFrames,
            userCount: userCount,
            isCitizen: isCitizen,
            ageClass: ageClass
        } });
    };
    // 戻る
    const goBack = () => {
        navigate(-1); // 1つ前のページに戻る
    };

    return (
        <>
            <h2>予約情報</h2>
            <p>{facility.name}</p>
            <p>{facility.address}</p>
            <form onSubmit={handleConfirm}>
                <label>
                    <h4>時間</h4>
                    {checkboxItems}
                </label>
                <br />
                <label>
                    <h4>人数</h4>
                    <input type="number" value={userCount} onChange={handleUserCountChange} />
                </label>
                <br />
                <label>
                    <h4>お住まい</h4>
                    <select onChange={handleSelectIsCitizen} value={isCitizen ? '市内' : '市外'}>
                        <option value="市内">市内</option>
                        <option value="市外">市外</option>
                    </select>
                </label>
                <br />
                <label>
                    <h4>年齢区分</h4>
                <select onChange={handleSelectAgeClass} value={ageClass}>
                    <option value="highSchoolStudentOrLess">高校生以下</option>
                    <option value="60YearsOldOrMore">60歳以上</option>
                    <option value="other">その他</option>
                </select>
                </label>
                <br />
                <button type="submit">確認画面へ</button>
            </form>
            <button onClick={goBack}>戻る</button>
        </>
    );
}

export default ReservationInput;
