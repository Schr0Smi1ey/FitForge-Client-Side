import { BarChart } from "@mui/x-charts";
import { BRAND } from "../../../../theme";

/**
 * Revenue split across the three membership tiers.
 *
 * Takes the already-aggregated rows from GET /admin-stats rather than a list of
 * payments: the database does the grouping, so this stays the same size whether
 * there are ten payments or ten million.
 */
const currency = (n) => `$${Number(n || 0).toLocaleString()}`;

const RevenueByTier = ({ revenueByTier = [], totalRevenue = 0, totalTransactions = 0 }) => {
  if (!revenueByTier.length) {
    return (
      <div className="bg-white dark:bg-black border dark:border-gray-700 rounded-2xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-primary mb-2">Revenue by Tier</h3>
        <p className="text-gray-600 dark:text-gray-400">
          No payments recorded yet.
        </p>
      </div>
    );
  }

  const labels = revenueByTier.map((r) => r.packageName);
  const totals = revenueByTier.map((r) => r.total);

  return (
    <div
      data-aos="fade-up"
      className="bg-white dark:bg-black border dark:border-gray-700 rounded-2xl p-6 shadow-sm"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
        <h3 className="text-xl font-bold text-primary">Revenue by Tier</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {currency(totalRevenue)} across {totalTransactions} transaction
          {totalTransactions === 1 ? "" : "s"}
        </p>
      </div>

      <div className="overflow-x-auto">
        <BarChart
          xAxis={[{ scaleType: "band", data: labels }]}
          series={[{ data: totals, label: "Revenue ($)", color: BRAND.primary }]}
          height={280}
        />
      </div>

      {/* The chart shows shape; the table gives the exact figures, which is what
          an admin reconciling revenue actually needs. */}
      <div className="overflow-x-auto mt-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-primary border-b dark:border-gray-700">
              <th className="py-2">Tier</th>
              <th className="py-2 text-right">Transactions</th>
              <th className="py-2 text-right">Revenue</th>
              <th className="py-2 text-right">Share</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-400">
            {revenueByTier.map((row) => (
              <tr key={row.packageName} className="border-b dark:border-gray-800">
                <td className="py-2 font-medium">{row.packageName}</td>
                <td className="py-2 text-right">{row.count}</td>
                <td className="py-2 text-right">{currency(row.total)}</td>
                <td className="py-2 text-right">
                  {totalRevenue
                    ? `${((row.total / totalRevenue) * 100).toFixed(1)}%`
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RevenueByTier;
