import { useMemo, useState } from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Delete, Edit } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { userService } from '../services/user.services';
import { useUserStore } from '../store/user.store';

export function createUserData(user) {
  const name = Object.values(user.name).filter(Boolean).join(' ');
  return { ...user, id: user._id, name };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const columns = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: true,
    label: 'Email',
  },
  {
    id: 'phone',
    numeric: false,
    disablePadding: false,
    label: 'Phone',
  },
  {
    id: 'isBusiness',
    numeric: false,
    disablePadding: false,
    label: 'Business',
  },
  {
    id: 'isAdmin',
    numeric: false,
    disablePadding: false,
    label: 'Admin',
  },
  {
    id: 'actions',
    numeric: false,
    disablePadding: false,
    label: '',
  }
];

function UsersTableHead({ onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort }) {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all users' }}
          />
        </TableCell>
        {columns.map((col) => (
          <TableCell
            key={col.id}
            align={col.numeric ? 'right' : 'left'}
            padding={col.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === col.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === col.id}
              direction={orderBy === col.id ? order : 'asc'}
              onClick={() => onRequestSort(col.id)}
            >
              {col.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function UsersTableToolbar({ numSelected, handleDeleteSelected }) {
  return (
    <Toolbar
      sx={[
        { pl: { sm: 2 }, pr: { xs: 1, sm: 1 }, },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Users
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={handleDeleteSelected}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        null
      )}
    </Toolbar>
  );
}

export default function UsersTable({ rows }) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { user, setUser, users, setUsers } = useUserStore();

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = ({ target }) => {
    if (target.checked) {
      const selected = rows.map((row) => row.id);
      return setSelected(selected);
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const index = selected.indexOf(id);
    if (index === -1) {
      setSelected([...selected, id]);
    } else {
      setSelected(selected.filter((userId) => userId != id));
    }
  };

  const handleDeleteSelected = async () => {
    if (confirm('Are you sure you want to remove these users?')) {
      const promises = selected.map(userService.remove);
      await Promise.all(promises);

      setUsers(users.filter((user) => !selected.includes(user._id)));

      if (selected.includes(user._id)) {
        setUser(undefined);
      }

      setSelected([]);
    }
  };

  const handleDelete = async (event, id) => {
    event.stopPropagation();

    if (confirm('Are you sure you want to remove the user?')) {
      await userService.remove(id);

      setUsers(users.filter((user) => user._id != id));

      if (user._id == id) {
        setUser(undefined);
      }
    }
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = useMemo(
    () => [...rows]
      .sort(getComparator(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [rows, order, orderBy, page, rowsPerPage],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <UsersTableToolbar numSelected={selected.length} handleDeleteSelected={handleDeleteSelected} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <UsersTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row.id);
                const labelId = `users-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>{row.isBusiness ? '✓' : ''}</TableCell>
                    <TableCell>{row.isAdmin ? '✓' : ''}</TableCell>
                    <TableCell align="right">
                      <IconButton LinkComponent={Link} to={`/admin/${row.id}`}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={(e) => handleDelete(e, row.id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
