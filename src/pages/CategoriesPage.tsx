import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { CATEGORY_LIST, CATEGORY_LABELS } from "../categories"
import { formatMoney } from "../format"
import { usePaymentsStore } from "../store"

type Category = typeof CATEGORY_LIST[number]

interface IRow {
  category: Category
  count: number
  paidCount: number
  total: number
  due: number
}

export default function CategoriesPage() {
  const items = usePaymentsStore(state => state.items)
  const [rows, setRows] = useState<IRow[]>([])
  useEffect(() => {
    const acc: Record<Category, IRow> = CATEGORY_LIST.reduce((a, cat) => {
      a[cat] = { category: cat, count: 0, paidCount: 0, total: 0, due: 0 }
      return a
    }, {} as Record<Category, IRow>)

    items.forEach(item => {
      const cat = (item.category as Category)
      if (!acc[cat]) {
        return
      }
      const row = acc[cat]
      row.count += 1
      row.total += item.amount
      if (item.paid) {
        row.paidCount += 1
      } else {
        row.due += item.amount
      }
    })

    const arr = CATEGORY_LIST.map(cat => acc[cat])
      .filter(r => r.count > 0)
      .sort((a, b) => b.total - a.total)

    setRows(arr)
  }, [items])

  if (rows.length === 0) {
    return (
      <p className="empty">
        Данных пока нет. <Link to="/">Добавить подписку</Link>.
      </p>
    )
  }

  return (
    <div className="categories-page">
      <ul className="list">
        {rows.map((r) => (
          <li key={r.category} className="cat">
            <div className={`cat__head ${r.category}`}>
              <span>{r.category ? CATEGORY_LABELS[r.category] : CATEGORY_LABELS["other"]}</span>
              <span>{r.count} шт.</span>
            </div>
            <div className="cat__body">
              <p className="cat__total">{formatMoney(r.total)}</p>
              <div className="meter" aria-hidden="true">
                <i
                  style={{
                    width: `${((r.total - r.due) / r.total) * 100}%`
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
    </div>
  )
}