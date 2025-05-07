
// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Select,
//   MenuItem,
//   Pagination,
//   FormControl,
//   InputLabel,
//   Paper,
// } from "@mui/material";

// function EXCHANGE() {
//   const [rates, setRates] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [entriesPerPage, setEntriesPerPage] = useState(10);
//   const [page, setPage] = useState(1);

//   const base = "USD";

//   useEffect(() => {
//     const fetchRates = async () => {
//       try {
//         const response = await fetch(`https://v6.exchangerate-api.com/v6/77e571783ee71eebfe494ac5/latest/${base}`);
//         const data = await response.json();
//         if (data.result === "success") {
//           setRates(data.conversion_rates);
//           setLoading(false);
//         } else {
//           throw new Error("API returned error");
//         }
//       } catch (err) {
//         setError("Failed to fetch exchange rates.");
//         setLoading(false);
//       }
//     };

//     fetchRates();
//   }, []);

//   const entries = Object.entries(rates);
//   const totalPages = Math.ceil(entries.length / entriesPerPage);

//   const handleChangeEntries = (event) => {
//     setEntriesPerPage(event.target.value);
//     setPage(1); // Reset to first page
//   };

//   const handlePageChange = (_, value) => {
//     setPage(value);
//   };

//   const displayedEntries = entries.slice((page - 1) * entriesPerPage, page * entriesPerPage);

//   return (
//     <Box sx={{ padding: "20px" }}>
//       <Typography variant="h4" gutterBottom>
//         Exchange Rates (Base: {base})
//       </Typography>

//       {loading ? (
//         <Typography>Loading exchange rates...</Typography>
//       ) : error ? (
//         <Typography color="error">{error}</Typography>
//       ) : (
//         <>
          

//           <Paper  sx={{ padding: 2, border: "none" }}>
//             {displayedEntries.map(([currency, value]) => (
//               <Box
//                 key={currency}
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   padding: "8px 0",
//                   borderBottom: "1px solid #ddd",
//                 }}
//               >
//                 <Typography>{currency}</Typography>
//                 <Typography>{value}</Typography>
//               </Box>
//             ))}
//           </Paper>

//           <Box sx={{ display: "flex", justifyContent: "end", marginTop: 3 }}>
//           <Typography variant="h6"  sx={{ marginRight: 2 }}>
//             Total Entries: {entries.length}
//           </Typography>
//           <FormControl size="small">
//               <InputLabel>Entries</InputLabel>
//               <Select value={entriesPerPage} label="Entries" onChange={handleChangeEntries}>
//                 {[10, 25, 50, 100].map((num) => (
//                   <MenuItem key={num} value={num}>
//                     {num}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//             <Pagination count={totalPages} page={page} onChange={handlePageChange} sx={{ marginLeft: 2, backgroundColor: "white" }}/>
          
//           </Box>
//         </>
//       )}
//     </Box>
//   );
// }

// export default EXCHANGE;


import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Pagination,
  FormControl,
  InputLabel,
  Paper,
  useTheme, // Import useTheme hook
} from "@mui/material";

function EXCHANGE() {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [page, setPage] = useState(1);

  const base = "USD";
  
  // Access the current theme
  const theme = useTheme();
  
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/77e571783ee71eebfe494ac5/latest/${base}`);
        const data = await response.json();
        if (data.result === "success") {
          setRates(data.conversion_rates);
          setLoading(false);
        } else {
          throw new Error("API returned error");
        }
      } catch (err) {
        setError("Failed to fetch exchange rates.");
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  const entries = Object.entries(rates);
  const totalPages = Math.ceil(entries.length / entriesPerPage);

  const handleChangeEntries = (event) => {
    setEntriesPerPage(event.target.value);
    setPage(1); // Reset to first page
  };

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  const displayedEntries = entries.slice((page - 1) * entriesPerPage, page * entriesPerPage);

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Exchange Rates (Base: {base})
      </Typography>

      {loading ? (
        <Typography>Loading exchange rates...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <>
          <Paper sx={{ padding: 2, border: "none" }}>
            {displayedEntries.map(([currency, value]) => (
              <Box
                key={currency}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 0",
                  borderBottom: "1px solid #ddd",
                }}
              >
                <Typography>{currency}</Typography>
                <Typography>{value}</Typography>
              </Box>
            ))}
          </Paper>

          <Box sx={{ display: "flex", justifyContent: "end", marginTop: 3 }}>
            <Typography variant="h6" sx={{ marginRight: 2 }}>
              Total Entries: {entries.length}
            </Typography>
            <FormControl size="small">
              <InputLabel>Entries</InputLabel>
              <Select value={entriesPerPage} label="Entries" onChange={handleChangeEntries}>
                {[10, 25, 50, 100].map((num) => (
                  <MenuItem key={num} value={num}>
                    {num}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              sx={{
                marginLeft: 2,
                backgroundColor: theme.palette.mode === "dark" ? "#121212" : "white", 
                color: theme.palette.mode === "dark" ? "white" : "black", 
              }}
            />
          </Box>
        </>
      )}
    </Box>
  );
}

export default EXCHANGE;