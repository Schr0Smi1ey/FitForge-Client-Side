/**
 * Placeholder rows for table-shaped dashboard routes.
 *
 * A centred spinner throws away the layout and makes the page jump when data
 * lands. A skeleton keeps the page the right shape, so the content appears in
 * place instead of shifting everything down.
 *
 * aria-hidden because the shapes carry no information; the wrapper's role="status"
 * is what tells assistive tech that something is loading, once.
 */
const TableSkeleton = ({ rows = 5, columns = 4, title = true }) => (
  <div role="status" aria-live="polite" className="p-4 animate-pulse">
    <span className="sr-only">Loading table data</span>

    {title && (
      <div
        aria-hidden="true"
        className="mx-auto mb-6 h-8 w-56 rounded-lg bg-gray-200 dark:bg-gray-800"
      />
    )}

    <div aria-hidden="true" className="overflow-hidden rounded-lg">
      <div className="mb-2 flex gap-4 rounded-t-lg bg-gray-300 p-4 dark:bg-gray-700">
        {Array.from({ length: columns }).map((_, i) => (
          <div key={i} className="h-4 flex-1 rounded bg-gray-400 dark:bg-gray-600" />
        ))}
      </div>

      {Array.from({ length: rows }).map((_, r) => (
        <div
          key={r}
          className="flex items-center gap-4 border-b border-gray-100 p-4 dark:border-gray-800"
        >
          {Array.from({ length: columns }).map((_, c) => (
            <div
              key={c}
              className="h-4 flex-1 rounded bg-gray-200 dark:bg-gray-800"
            />
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default TableSkeleton;
