const SummaryCards = ({ summary }) => {
  if (!summary) {
    return (
      <div className="rounded-xl bg-white p-5 text-sm text-slate-500 shadow-sm">
        Loading...
      </div>
    );
  }

  const cards = [
    { title: "Total Income", value: summary.totalIncome },
    { title: "Total Expense", value: summary.totalExpense },
    { title: "Net Balance", value: summary.netBalance }
  ];

  const categoryEntries = Object.entries(summary.categoryTotals || {});

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div key={card.title} className="rounded-xl bg-white p-5 shadow-sm">
            <h3 className="text-sm font-medium text-slate-500">{card.title}</h3>
            <p className="mt-2 text-2xl font-semibold text-slate-800">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-slate-800">Category Totals</h3>

        {categoryEntries.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categoryEntries.map(([key, value]) => (
              <div
                key={key}
                className="rounded-lg bg-slate-50 px-4 py-3"
              >
                <p className="text-sm capitalize text-slate-600">
                  {key.replaceAll("_", " ")}
                </p>
                <p className="mt-1 font-semibold text-slate-800">{value}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">No category summary available</p>
        )}
      </div>
    </div>
  );
};

export default SummaryCards;