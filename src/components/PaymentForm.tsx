import { useState } from "react"
import { todayISO } from "../format"
import { TCategory } from "../types"
import { usePaymentsStore } from "../store"
import { CATEGORY_LABELS, CATEGORY_LIST } from "../categories"

export default function PaymentForm() {
    const [title, setTitle] = useState<string>('')
    const [amount, setAmount] = useState<string>("0")
    const [due, setDue] = useState<string>(todayISO())
    const [category, setCategory] = useState<TCategory>('video')
    const [error, setError] = useState<string>('')
    const { addPayment } = usePaymentsStore()

    const handleMain = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')
        const trimmedTitle = title.trim()
        if (trimmedTitle.length === 0) {
            setError("Название не может быть пустым")
            return
        }

        if (!Number.isFinite(Number(amount)) || Number(amount) <= 0) {
            setError("Цена должна быть конечным положительным числом")
            return
        }

        if (!due) {
            setError("Дата не заполнена")
            return
        }

        addPayment({ title: trimmedTitle, amount: Number(amount), due, category })
        setTitle('')
        setAmount("0")
        setError('')
    }
    return (
        <form className="box" onSubmit={handleMain}>
            <h2 className="h">Новая подписка</h2>

            <label className="field">
                <span>Название</span>
                <input
                    type="text"
                    placeholder="Например, Figma"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength={60}
                />
            </label>

            <div className="two">
                <label className="field">
                    <span>Цена, ₽</span>
                    <input type="number" inputMode="decimal" placeholder="0" value={amount}
                        onChange={(e) => setAmount(e.target.value)} />
                </label>
                <label className="field">
                    <span>Оплатить до</span>
                    <input type="date" value={due}
                        onChange={(e) => setDue(e.target.value)} />
                </label>
            </div>

            <label className="field">
                <span>Категория</span>
                <select value={category}
                    onChange={(e) => setCategory(e.target.value as TCategory)}>
                    {CATEGORY_LIST.map((e, i) => (
                        <option value={e} key={i}>{CATEGORY_LABELS[e]}</option>
                    ))}
                </select>
            </label>

            {error && (
                <p className="error" role="alert">{error}</p>
            )}

            <button className="btn" type="submit">
                Добавить
            </button>
        </form>
    )
}
