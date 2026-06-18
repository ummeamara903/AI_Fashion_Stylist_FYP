type Props = {
  title: string
  items: string[]
}

export default function ResultSection({ title, items }: Props) {
  if (!items || items.length === 0) return null

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <div className="flex flex-wrap gap-2">
  {items.map((item, index) => (
    <span
      key={index}
      className="px-3 py-1 bg-gray-100 rounded-full text-sm"
    >
      {item}
    </span>
  ))}
</div>
    </div>
  )
}