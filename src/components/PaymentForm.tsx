export default function PaymentForm() {
    return (
        <form className="box">
            <h2 className="h">Новая подписка</h2>

            <label className="field">
                <span>Название</span>
                <input
                    type="text"
                    placeholder="Например, Figma"
                    maxLength={60}
                />
            </label>

            <div className="two">
                <label className="field">
                    <span>Цена, ₽</span>
                    <input type="text" inputMode="decimal" placeholder="0" />
                </label>
                <label className="field">
                    <span>Оплатить до</span>
                    <input type="date" />
                </label>
            </div>

            <label className="field">
                <span>Категория</span>
                <select>
                    <option>Категория 1</option>
                </select>
            </label>

            <p className="error" role="alert"></p>

            <button className="btn" type="submit">
                Добавить
            </button>
        </form>
    )
}
