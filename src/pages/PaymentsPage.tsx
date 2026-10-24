import PaymentForm from "../components/PaymentForm"
import PaymentItem from "../components/PaymentItem"
import { formatMoney } from "../format"
import { usePaymentsStore } from "../store"
import { useState, useEffect } from "react"
import { IPayment } from "../types"


export default function PaymentsPage() {
    const {items} = usePaymentsStore()
    const [sorted, setSorted] = useState<IPayment[]>([])

 useEffect(() => {
    const copy = [...items]
    const sortedItems = copy.sort((a, b) => {
    const diffPaid = Number(a.paid) - Number(b.paid)
      if (diffPaid !== 0) return diffPaid
      return a.due.localeCompare(b.due)
    })
    setSorted(sortedItems)
    setTotal(items.reduce((acc, item)=> acc + item.amount, 0))
    setPaid(items.filter((e) => e.paid !== false).reduce((acc, item)=> acc + item.amount, 0))
  }, [items])

    const [total, setTotal] = useState<number>(0)
    const [paid, setPaid] = useState<number>(0)

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
                        <PaymentItem key={p.id} payment={p}/>
                    ))}
                </ul>
            )}
        </>
    )
}
