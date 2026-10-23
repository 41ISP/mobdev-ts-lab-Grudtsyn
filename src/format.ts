const money = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 2,
})

export const formatMoney = (value: number): string => money.format(value)

const MONTHS = [
    "янв",
    "фев",
    "мар",
    "апр",
    "мая",
    "июн",
    "июл",
    "авг",
    "сен",
    "окт",
    "ноя",
    "дек",
]

export function dateParts(iso: string): { day: string; month: string } {
    const [, m, d] = iso.split("-")
    return { day: d ?? "", month: MONTHS[Number(m) - 1] ?? "" }
}

export function todayISO(): string {
    const d = new Date()
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
    return d.toISOString().slice(0, 10)
}
