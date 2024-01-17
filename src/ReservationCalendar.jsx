import { useState } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import reservationFrames from "./dummies/reservationFrames";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function ReservationCalendar() {
    const navigate = useNavigate();
    const location = useLocation();
    const facility = location.state && location.state.facility ? location.state.facility : null;
    const [date, setDate] = useState(new Date());

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

    // 日付をクリックした際の処理
    const onClick = (newDate) => {
        setDate(newDate);
        const formattedDate = formatDate(newDate);
        const frames =  reservationFrames.filter(frame => 
            frame.datetime.startsWith(formattedDate) && frame.facilityId === facility.id
        );
        navigate('/reservation_input', { state: {facility: facility, reservationFrame: frames} });
    };

    // 日付をフォーマット
    const formatDate = (date) => {
        const d = new Date(date);
        const month = `${d.getMonth() + 1}`.padStart(2, '0');
        const day = `${d.getDate()}`.padStart(2, '0');
        return `${d.getFullYear()}-${month}-${day}`;
    };

    // 各日付の下部に表示する文字列
    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const formattedDate = formatDate(date);
            // 指定された日付の予約フレームを取得
            const dailyFrames = reservationFrames.filter(frame => 
                frame.datetime.startsWith(formattedDate)
            );
            // 空き予約を集計
            const countTrue = dailyFrames.filter(frame => frame.userId === null && frame.facilityId === facility.id).length;
            let content;
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (date <= today) {
                content = "-"
            } else if (countTrue === 0) {
                content = "×";
            } else if (countTrue > 0 && countTrue <= 3) {
                content = "△";
            } else if (countTrue >= 4) {
                content = "○";
            }

            return content && <p>{content}</p>;
        }
    };

    const goBack = () => {
        navigate(-1); // 1つ前のページに戻る
    };

    return (
        <>
            <h2>利用日</h2>
            <p>{facility.name}</p>
            <p>{facility.address}</p>
            <div>
                <Calendar
                    onChange={onClick}
                    value={date}
                    tileContent={tileContent}
                />
            </div>
            <button onClick={goBack}>戻る</button>
        </>
    );
}

export default ReservationCalendar;
