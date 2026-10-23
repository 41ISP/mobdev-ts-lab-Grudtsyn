import { formatMoney } from "../format"

export default function CategoriesPage() {
    const rows: any[] = []

    return (
        <ul className="list">
            {rows.map((r) => (
                <li key={r.category} className="cat">
                    <div className={`cat__head ${r.category}`}>
                        <span>%НАЗВАНИЕ_КАТЕГОРИИ%</span>
                        <span>{r.count} шт.</span>
                    </div>
                    <div className="cat__body">
                        <p className="cat__total">{formatMoney(r.total)}</p>
                        <div className="meter" aria-hidden="true">
                            <i
                                style={{
                                    width: `${((r.total - r.due) / r.total) * 100}%`,
                                }}
                            />
                        </div>
                        <p className="row">
                            <span>Оплачено</span>
                            <b>
                                {r.paidCount} из {r.count}
                            </b>
                        </p>
                        <p className="row">
                            <span>К оплате</span>
                            <b>{formatMoney(r.due)}</b>
                        </p>
                    </div>
                </li>
            ))}
        </ul>
    )
}
