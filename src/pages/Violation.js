import * as React from "react";

import { useNavigate, useParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columns = [
  { id: "1", field: "depsCode", label: "Код", minWidth: 100 },
  { id: "2", field: "depsName", label: "Участок", minWidth: 170 },
  { id: "3", field: "createdat", label: "Дата", minWidth: 170, align: "right" },
  {
    id: "4",
    field: "violator",
    label: "Нарушитель",
    minWidth: 170,
    align: "right",
  },
  {
    id: "5",
    field: "tab_num",
    label: "Таб.номер",
    minWidth: 170,
    align: "right",
  },
];

export default function StickyHeadTable(searchValue, dateBegin, dateEnd) {
  const navigate = useNavigate();

  const [items, setItems] = React.useState([]);

  const tableData = items.reduce((acc, item) => {
    const data = {
      ...item,
      depsName: item.dep.name,
      depsCode: item.dep.code,
    };
    return [...acc, data];
  }, []);

  React.useEffect(() => {
    fetch("http://localhost:8080/violadb")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
      });
  }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onClickRow = (violaId, depsName) => {
    navigate(`/violationData/${violaId}`);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData
              .filter((row) => {
                return row.createdat >= dateBegin && row.createdat <= dateEnd;
              })

              .filter((row) =>
                (row.depsCode + row.depsName)
                  .toString()
                  .toLowerCase()
                  .includes(searchValue.toString().toLowerCase())
              )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    onClick={() => onClickRow(row.id, row.depsName)}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                  >
                    {columns.map((column) => {
                      const value = row[column.field];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={items.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
