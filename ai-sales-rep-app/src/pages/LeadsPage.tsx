import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Table, TableHead, TableBody, TableRow, TableCell, TablePagination,
  Select, MenuItem, Typography,
  Stack,
  Button
} from '@mui/material';
import { fetchChatHistories, History } from '../services/api'; // You'll create this API call

export const LeadsPage = () => {
  const navigate = useNavigate();

  const [leads, setLeads] = useState<History[]>([]);
  const [filteredTag, setFilteredTag] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const loadLeads = async () => {
      const res = await fetchChatHistories();
      setLeads(res);
    };
    loadLeads();
  }, []);

  const filteredLeads = filteredTag
    ? leads.filter(l => l.tag.toLowerCase() === filteredTag.toLowerCase())
    : leads;

  return (
    <Box p={4}>
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h5">
          Leads
        </Typography>
        <Button
          variant="outlined"
          color="inherit"
          onClick={() => navigate('/')}
        >
          Go Back
        </Button>
      </Stack>

      <Box mb={2}>
        <Select
          value={filteredTag}
          onChange={(e) => setFilteredTag(e.target.value)}
          displayEmpty
        >
          <MenuItem value="">All Tags</MenuItem>
          <MenuItem value="not relevant">Not relevant</MenuItem>
          <MenuItem value="weak lead">Weak lead</MenuItem>
          <MenuItem value="hot lead">Hot lead</MenuItem>
          <MenuItem value="very big potential">Very big potential</MenuItem>
        </Select>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Tag</TableCell>
            <TableCell>Conversation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredLeads
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((lead, idx) => (
              <TableRow key={idx}>
                <TableCell>{lead.email || '—'}</TableCell>
                <TableCell>{lead.companyName || '—'}</TableCell>
                <TableCell>{lead.tag}</TableCell>
                <TableCell>
                  {lead.chatHistory?.slice(1, 50).map((msg, i) => (
                    <div key={i}>
                      - <strong>{msg.from === 'bot' ? 'Bot' : 'Human'}:</strong> {msg.text}
                    </div>
                  )) || '—'}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={filteredLeads.length}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />
    </Box>
  );
};
