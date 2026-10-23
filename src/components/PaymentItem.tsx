import { dateParts, formatMoney } from "../format"

export default function PaymentItem() {
    const { day, month } = dateParts("2026-02-12")

    return (
        <li className={false ? "item paid" : "item"}>
            <div className="main">
                <time className="date" dateTime={"2026-02-12"}>
                    <b>{day}</b>
                    {month}
                </time>
                <div className="info">
                    <span className="name">Spotify</span>
                    <span className={`tag apps`}>Приложения</span>
                </div>
                <span className="price">{formatMoney(159)}</span>
            </div>
            <div className="bar">
                <label className="check">
                    <input type="checkbox" />
                    Оплачено
                </label>
                <button className="del" type="button">
                    Удалить
                </button>
            </div>
        </li>
    )
}
