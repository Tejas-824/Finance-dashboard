const RecordTable = ({
  title = "Records",
  records,
  loading,
  showCreatedBy = false
}) => {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-slate-800">{title}</h3>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-slate-600">
              <th className="px-3 py-3">Amount</th>
              <th className="px-3 py-3">Type</th>
              <th className="px-3 py-3">Category</th>
              <th className="px-3 py-3">Date</th>
              <th className="px-3 py-3">Notes</th>
              {showCreatedBy && <th className="px-3 py-3">Created By</th>}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={showCreatedBy ? 6 : 5}
                  className="px-3 py-6 text-center text-slate-500"
                >
                  Loading...
                </td>
              </tr>
            ) : records?.length > 0 ? (
              records.map((item) => (
                <tr key={item._id} className="border-b border-slate-100">
                  <td className="px-3 py-3">{item.amount}</td>
                  <td className="px-3 py-3 capitalize">{item.type}</td>
                  <td className="px-3 py-3">{item.category}</td>
                  <td className="px-3 py-3">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td className="px-3 py-3">{item.notes || "-"}</td>
                  {showCreatedBy && (
                    <td className="px-3 py-3">
                      {item.createdBy?.name || "-"}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={showCreatedBy ? 6 : 5}
                  className="px-3 py-6 text-center text-slate-500"
                >
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecordTable;