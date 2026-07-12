export default function Table({ columns = [], rows = [], emptyLabel = "No records yet." }) {
  if (!rows.length) {
    return (
      <div className="rounded-card border border-brand-100 p-8 text-center text-sm text-[var(--text-muted)]">
        {emptyLabel}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-card border border-brand-100">
      <table className="w-full text-left text-sm">
        <thead className="bg-brand-50 text-brand-800">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 font-medium">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.id || i} className="border-t border-brand-100">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-[#1A1730]">
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
