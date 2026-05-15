import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const DataTable = ({column, data, rowKey}) => {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] text-white">Invoice</TableHead>
          <TableHead className="text-white">Status</TableHead>
          <TableHead className="text-white">Method</TableHead>
          <TableHead className="text-right text-white">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium text-white">INV001</TableCell>
          <TableCell className="text-white">Paid</TableCell>
          <TableCell className="text-white">Credit Card</TableCell>
          <TableCell className="text-right text-white">$250.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default DataTable;
