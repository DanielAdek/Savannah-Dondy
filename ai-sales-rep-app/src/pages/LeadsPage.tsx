import React, { useEffect, useState } from 'react';
import {
  Box, Table, TableHead, TableBody, TableRow, TableCell, TablePagination,
  Select, MenuItem, Typography, CircularProgress, Stack, Button
} from '@mui/material';
import { fetchChatHistories, History } from '../services/api';
import { useNavigate } from 'react-router-dom';

export const LeadsPage = () => {
  const [leads, setLeads] = useState<History[]>([]);
  const [filteredTag, setFilteredTag] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadLeads = async () => {
      try {
        const res = await fetchChatHistories(localStorage.getItem('user-x') as string);
        setLeads(res);
      } catch (e) {
        console.error('Failed to fetch leads:', e);
      } finally {
        setLoading(false);
      }
    };
    loadLeads();
  }, []);

  const filteredLeads = filteredTag
    ? leads.filter(l => l.tag === filteredTag)
    : leads;

  return (
    <Box p={4}>
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h5">Potential Customers</Typography>
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
          <MenuItem value="Not relevant">Not relevant</MenuItem>
          <MenuItem value="Weak lead">Weak lead</MenuItem>
          <MenuItem value="Hot lead">Hot lead</MenuItem>
          <MenuItem value="Very big potential">Very big potential</MenuItem>
        </Select>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
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
                      {lead.chatHistory?.slice(1, 100).map((msg, i) => (
                        <div key={i}>
                          <strong>{msg.from === 'bot' ? 'Bot' : 'User'}:</strong> {msg.text}
                        </div>
                      ))}
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
        </>
      )}
    </Box>
  );
};
