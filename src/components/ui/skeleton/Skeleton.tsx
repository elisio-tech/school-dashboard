import { TableCell, TableRow } from "../table";

type SkeletonProps = {
  index: number;
};

export default function Skeleton({ index }: SkeletonProps) {
  return (
    <TableRow key={index} className="animate-pulse">
      <TableCell className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-400 dark:bg-gray-700 rounded-full"></div>
          <div className="h-4 w-32 bg-gray-400 dark:bg-gray-700 rounded"></div>
        </div>
      </TableCell>
      <TableCell className="px-4 py-3">
        <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </TableCell>
      <TableCell className="px-4 py-3">
        <div className="h-4 w-40 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </TableCell>
      <TableCell className="px-4 py-3">
        <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </TableCell>
    </TableRow>
  );
}
