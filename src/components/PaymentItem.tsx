import { CATEGORY_LABELS } from "../categories"
import { dateParts, formatMoney } from "../format"
import { IPayment } from "../types"
import { usePaymentsStore } from "../store"

interface IPaymentItemProps{
        payment: IPayment
}

export default function PaymentItem({payment}: IPaymentItemProps) {
    const { removePayment } = usePaymentsStore()
    const { togglePaid } = usePaymentsStore()
    const { day, month } = dateParts(payment.due)
    const meta = payment.category ? CATEGORY_LABELS[payment.category] : CATEGORY_LABELS["other"]
    return (
        <li className={payment.paid ? "item paid" : "item"}>
            <div className="main">
                <time className="date" dateTime={payment.due}>
                    <b>{day}</b>
                    {month}
                </time>
                <div className="info">
                    <span className="name">{payment.title}</span>
                    <span className={`tag ${payment.category}`}>{meta}</span>
                </div>
                <span className="price">{formatMoney(payment.amount)}</span>
            </div>
            <div className="bar">
                <label className={`${payment.paid} ? checked : check`}>
                    <input type="checkbox" checked={payment.paid} onChange={() => togglePaid(payment.id)}/>
                    {payment.paid ? "Оплачено" : "Неоплачено"}
                </label>
                <button className="del" type="button" onClick={() => removePayment(payment.id)}>
                    Удалить
                </button>
            </div>
        </li>
    )
}
