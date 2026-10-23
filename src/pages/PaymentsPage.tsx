import PaymentForm from "../components/PaymentForm"
import PaymentItem from "../components/PaymentItem"
import { formatMoney } from "../format"

export default function PaymentsPage() {
    const sorted: any[] = [1]
    const total = 0
    const paid = 0

    return (
        <>
            <section className="sum" aria-label="Итоги месяца">
                <small>Всего в месяц</small>
                <b>{formatMoney(total)}</b>
                <div className="split">
                    <div>
                        <small>Оплачено</small>
                        <strong>{formatMoney(paid)}</strong>
                    </div>
                    <div>
                        <small>Осталось</small>
                        <strong>{formatMoney(total - paid)}</strong>
                    </div>
                </div>
            </section>

            <PaymentForm />

            <h2 className="h plain">Ближайшие платежи</h2>
            {sorted.length === 0 ? (
                <p className="empty">
                    Подписок пока нет. Добавьте первую в форме выше.
                </p>
            ) : (
                <ul className="list">
                    {sorted.map((p) => (
                        <PaymentItem key={p.id} />
                    ))}
                </ul>
            )}
        </>
    )
}
