import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "./store/userSlice";
import facilities from "./dummies/facilities";
import reservationFrames from "./dummies/reservationFrames";

function Mypage() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user) || null;

    if (user === null) {
        return (
            <>
                <h3>ログイン直してください</h3>
                <button>
                    <Link
                        to={"/log_in"}
                    >
                        ログインページへ
                    </Link>
                </button>
            </>
        );
    }

    // 予約一覧
    const reservations = reservationFrames.filter(reservationFrame =>
        reservationFrame.userId === user.id
    );
    const groupedReservations = reservations.reduce((acc, reservation) => {
        // 施設を探す
        const facility = facilities.find(f => f.id === reservation.facilityId);
        // キーとして日付と施設名を使用
        const key = `${reservation.datetime.split(' ')[0]}_${facility.name}`;
        // すでにキーが存在すれば、その配列に追加。そうでなければ新しい配列を作成
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(reservation);
        return acc;
    }, {});
    const reservationItems = Object.values(groupedReservations).map((group) => {
        // グループ内の最初と最後の予約を取得
        const firstReservation = group[0];
        const lastReservation = group[group.length - 1];

        const facility = facilities.find(f => f.id === firstReservation.facilityId);

        // lastReservationのdatetimeに1時間加算
        const lastDateTime = new Date(lastReservation.datetime);
        lastDateTime.setHours(lastDateTime.getHours() + 9 + 1);  // JSTの9時間 + 1時間加算
        // 加算した時間をフォーマットする（例: 'YYYY-MM-DD HH:mm'形式）
        const lastDateTimeFormatted = lastDateTime.toISOString().replace(/T/, ' ').replace(/\..+/, '').substring(0, 16);

        return (
            <>
                <ul className="list-item">
                    <li>{facility.name}</li>
                    <li>{firstReservation.datetime} 〜 {lastDateTimeFormatted}</li>
                </ul>
            </>
        );
    });

    // ログアウト
    const handleClickLogOut = () => {
        dispatch(logOut());
    };

    return (
        <>
            <h2>マイページ</h2>
            <p>ID: {user.id}</p>
            <p>名前: {user.name}</p>
            <p>メールアドレス: {user.email}</p>
            <h3>予約一覧</h3>
            {reservationItems}
            <button onClick={handleClickLogOut}>
                <Link
                    to={"/log_in"}
                    key={"log_in"}
                >
                    ログアウト
                </Link>
            </button>
            <button>
                <Link
                    to={"/"}
                    key={"home"}
                >
                    トップへ
                </Link>
            </button>
        </>
    );
}

export default Mypage;
