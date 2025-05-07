// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   MenuItem,
//   Card,
//   CardContent,
//   Paper,
//   FormControl,
//   InputLabel,
//   Select,
//   Pagination,
//   Grid,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
// } from "@mui/material";
// import axios from "axios";
// import { useTheme } from "@mui/material/styles"; 

// function HOME() {
//   const theme = useTheme();

//   const [loanAmount, setLoanAmount] = useState("");
//   const [interestRate, setInterestRate] = useState("");
//   const [loanTenure, setLoanTenure] = useState("");
//   const [emi, setEmi] = useState(null);
//   const [amortizationSchedule, setAmortizationSchedule] = useState([]);
//   const [exchangeRates, setExchangeRates] = useState({});
//   const [selectedCurrency, setSelectedCurrency] = useState("USD");
//   const [entriesPerPage, setEntriesPerPage] = useState(10);
//   const [page, setPage] = useState(1);

//   const totalPages = Math.ceil(amortizationSchedule.length / entriesPerPage);

//   useEffect(() => {
//     axios
//       .get(
//         "https://v6.exchangerate-api.com/v6/77e571783ee71eebfe494ac5/latest/INR"
//       )
//       .then((res) => setExchangeRates(res.data.conversion_rates))
//       .catch((err) => console.error("Error fetching exchange rates:", err));
//   }, []);

//   const calculateEMI = () => {
//     const principal = parseFloat(loanAmount);
//     const rate = parseFloat(interestRate) / 12 / 100;
//     const tenure = parseFloat(loanTenure) * 12;
//     const emiAmount =
//       (principal * rate * Math.pow(1 + rate, tenure)) /
//       (Math.pow(1 + rate, tenure) - 1);

//     setEmi(emiAmount.toFixed(2));

//     let balance = principal;
//     let schedule = [];
//     for (let i = 1; i <= tenure; i++) {
//       let interestPayment = balance * rate;
//       let principalPayment = emiAmount - interestPayment;
//       balance -= principalPayment;

//       schedule.push({
//         month: i,
//         emi: emiAmount,
//         principal: principalPayment,
//         interest: interestPayment,
//         balance: balance,
//       });
//     }
//     setAmortizationSchedule(schedule);
//     setPage(1);
//   };

//   const handleCurrencyChange = (e) => {
//     setSelectedCurrency(e.target.value);
//   };

//   const handleChangeEntries = (e) => {
//     setEntriesPerPage(parseInt(e.target.value));
//     setPage(1);
//   };

//   const handlePageChange = (_, value) => {
//     setPage(value);
//   };

//   const conversionRate = exchangeRates[selectedCurrency] || 1;

//   const paginatedEntries = amortizationSchedule.slice(
//     (page - 1) * entriesPerPage,
//     page * entriesPerPage
//   );

//   return (
//     <Card sx={{ margin: "40px auto", padding: "20px" }}>
//       <CardContent>
//         <Typography variant="h4" gutterBottom align="center">
//           Loan EMI Calculator
//         </Typography>

//         <Grid container spacing={2} justifyContent="center">
//           <Grid item xs={12} sm={6} md={4} lg={3}>
//             <TextField
//               label="Loan Amount"
//               variant="outlined"
//               fullWidth
//               value={loanAmount}
//               onChange={(e) => setLoanAmount(e.target.value)}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6} md={4} lg={3}>
//             <TextField
//               label="Interest Rate (%)"
//               variant="outlined"
//               fullWidth
//               value={interestRate}
//               onChange={(e) => setInterestRate(e.target.value)}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6} md={4} lg={3}>
//             <TextField
//               label="Loan Tenure (years)"
//               variant="outlined"
//               fullWidth
//               value={loanTenure}
//               onChange={(e) => setLoanTenure(e.target.value)}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6} md={4} lg={3}>
//             <TextField
//               select
//               label="Currency"
//               fullWidth
//               value={selectedCurrency}
//               onChange={handleCurrencyChange}
//             >
//               {Object.keys(exchangeRates).map((currency) => (
//                 <MenuItem key={currency} value={currency}>
//                   {currency}
//                 </MenuItem>
//               ))}
//             </TextField>
//           </Grid>
//         </Grid>

//         <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
//           <Button variant="contained" onClick={calculateEMI}>
//             Calculate EMI
//           </Button>
//         </Box>

//         {emi && (
//           <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
//             <Typography variant="h6">
//               Estimated EMI in INR: ₹{parseFloat(emi).toFixed(2)}
//             </Typography>
//             <Typography variant="h6" sx={{ ml: 2 }}>
//               Estimated EMI in {selectedCurrency}: {selectedCurrency}{" "}
//               {(emi * conversionRate).toFixed(2)}
//             </Typography>
//           </Box>
//         )}

//         {amortizationSchedule.length > 0 && (
//           <Box sx={{ mt: 5 }}>
//             <Typography variant="h5" gutterBottom align="center">
//               Amortization Schedule ({selectedCurrency})
//             </Typography>

//             <Paper sx={{ padding: 2, overflowX: "auto" }}>
//               <TableContainer sx={{ overflowX: "auto" }}>
//                 <Table sx={{ minWidth: 650 }} aria-label="amortization table">
//                   <TableHead>
//                     <TableRow>
//                       <TableCell align="center">Month</TableCell>
//                       <TableCell align="center">EMI</TableCell>
//                       <TableCell align="center">Principal</TableCell>
//                       <TableCell align="center">Interest</TableCell>
//                       <TableCell align="center">Balance</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {paginatedEntries.map((row) => (
//                       <TableRow key={row.month}>
//                         <TableCell align="center">{row.month}</TableCell>
//                         <TableCell align="center">
//                           {selectedCurrency}{" "}
//                           {(row.emi * conversionRate).toFixed(2)}
//                         </TableCell>
//                         <TableCell align="center">
//                           {selectedCurrency}{" "}
//                           {(row.principal * conversionRate).toFixed(2)}
//                         </TableCell>
//                         <TableCell align="center">
//                           {selectedCurrency}{" "}
//                           {(row.interest * conversionRate).toFixed(2)}
//                         </TableCell>
//                         <TableCell align="center">
//                           {selectedCurrency}{" "}
//                           {(row.balance * conversionRate).toFixed(2)}
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </Paper>

//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 mt: 3,
//                 flexWrap: "wrap",
//                 gap: 2,
//               }}
//             >
//               <Typography variant="h6">
//                 Total Entries: {amortizationSchedule.length}
//               </Typography>
//               <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                 <FormControl size="small">
//                   <InputLabel>Entries</InputLabel>
//                   <Select
//                     value={entriesPerPage}
//                     label="Entries"
//                     onChange={handleChangeEntries}
//                   >
//                     {[10, 25, 50, 100].map((num) => (
//                       <MenuItem key={num} value={num}>
//                         {num}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//                 <Pagination
//                   count={totalPages}
//                   page={page}
//                   onChange={handlePageChange}
//                   sx={{
//                     backgroundColor:
//                       theme.palette.mode === "dark" ? "#1E1E1E" : "#F5F5F5", 
//                     borderRadius: 1,
//                   }}
//                 />
//               </Box>
//             </Box>
//           </Box>
//         )}
//       </CardContent>
//     </Card>
//   );
// }

// export default HOME;


import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Card,
  CardContent,
  Paper,
  FormControl,
  InputLabel,
  Select,
  Pagination,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useTheme } from "@mui/material/styles";

function HOME() {
  const theme = useTheme();

  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTenure, setLoanTenure] = useState("");
  const [emi, setEmi] = useState(null);
  const [amortizationSchedule, setAmortizationSchedule] = useState([]);
  const [exchangeRates, setExchangeRates] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [page, setPage] = useState(1);

  const [errors, setErrors] = useState({
    loanAmount: false,
    interestRate: false,
    loanTenure: false,
  });

  const totalPages = Math.ceil(amortizationSchedule.length / entriesPerPage);

  useEffect(() => {
    axios
      .get("https://v6.exchangerate-api.com/v6/77e571783ee71eebfe494ac5/latest/INR")
      .then((res) => setExchangeRates(res.data.conversion_rates))
      .catch((err) => console.error("Error fetching exchange rates:", err));
  }, []);

  const validateInputs = () => {
    const newErrors = {
      loanAmount: !loanAmount || parseFloat(loanAmount) <= 0,
      interestRate: !interestRate || parseFloat(interestRate) <= 0,
      loanTenure: !loanTenure || parseFloat(loanTenure) <= 0,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((val) => val);
  };

  const calculateEMI = () => {
    if (!validateInputs()) {
      setEmi(null);
      setAmortizationSchedule([]);
      return;
    }

    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 12 / 100;
    const tenure = parseFloat(loanTenure) * 12;
    const emiAmount =
      (principal * rate * Math.pow(1 + rate, tenure)) /
      (Math.pow(1 + rate, tenure) - 1);

    setEmi(emiAmount.toFixed(2));

    let balance = principal;
    let schedule = [];
    for (let i = 1; i <= tenure; i++) {
      let interestPayment = balance * rate;
      let principalPayment = emiAmount - interestPayment;
      balance -= principalPayment;

      schedule.push({
        month: i,
        emi: emiAmount,
        principal: principalPayment,
        interest: interestPayment,
        balance: balance < 0 ? 0 : balance,
      });
    }
    setAmortizationSchedule(schedule);
    setPage(1);
  };

  const handleCurrencyChange = (e) => {
    setSelectedCurrency(e.target.value);
  };

  const handleChangeEntries = (e) => {
    setEntriesPerPage(parseInt(e.target.value));
    setPage(1);
  };

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  const conversionRate = exchangeRates[selectedCurrency] || 1;

  const paginatedEntries = amortizationSchedule.slice(
    (page - 1) * entriesPerPage,
    page * entriesPerPage
  );

  return (
    <Card sx={{ margin: "40px auto", padding: "20px" }}>
      <CardContent>
        <Typography variant="h4" gutterBottom align="center">
          Loan EMI Calculator
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              label="Loan Amount"
              variant="outlined"
              fullWidth
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              error={errors.loanAmount}
              helperText={errors.loanAmount ? "Enter a valid amount > 0" : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              label="Interest Rate (%)"
              variant="outlined"
              fullWidth
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              error={errors.interestRate}
              helperText={errors.interestRate ? "Enter a valid rate > 0" : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              label="Loan Tenure (years)"
              variant="outlined"
              fullWidth
              value={loanTenure}
              onChange={(e) => setLoanTenure(e.target.value)}
              error={errors.loanTenure}
              helperText={errors.loanTenure ? "Enter a valid tenure > 0" : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              select
              label="Currency"
              fullWidth
              value={selectedCurrency}
              onChange={handleCurrencyChange}
            >
              {Object.keys(exchangeRates).map((currency) => (
                <MenuItem key={currency} value={currency}>
                  {currency}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Button variant="contained" onClick={calculateEMI}>
            Calculate 
          </Button>
        </Box>

        {emi && (
          <Box sx={{ mt: 3, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 2 }}>
            <Typography variant="h6">
              EMI in INR: ₹{parseFloat(emi).toFixed(2)}
            </Typography>
            <Typography variant="h6">
              EMI in {selectedCurrency}: {selectedCurrency}{" "}
              {(emi * conversionRate).toFixed(2)}
            </Typography>
          </Box>
        )}

        {amortizationSchedule.length > 0 && (
          <Box sx={{ mt: 5 }}>
            <Typography variant="h5" gutterBottom align="center">
              Amortization Schedule ({selectedCurrency})
            </Typography>

            <Paper sx={{ padding: 2, overflowX: "auto" }}>
              <TableContainer>
                <Table sx={{ minWidth: 600 }} size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Month</TableCell>
                      <TableCell align="center">EMI</TableCell>
                      <TableCell align="center">Principal</TableCell>
                      <TableCell align="center">Interest</TableCell>
                      <TableCell align="center">Balance</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedEntries.map((row) => (
                      <TableRow key={row.month}>
                        <TableCell align="center">{row.month}</TableCell>
                        <TableCell align="center">
                          {selectedCurrency} {(row.emi * conversionRate).toFixed(2)}
                        </TableCell>
                        <TableCell align="center">
                          {selectedCurrency} {(row.principal * conversionRate).toFixed(2)}
                        </TableCell>
                        <TableCell align="center">
                          {selectedCurrency} {(row.interest * conversionRate).toFixed(2)}
                        </TableCell>
                        <TableCell align="center">
                          {selectedCurrency} {(row.balance * conversionRate).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 3,
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Typography variant="h6">
                Total Entries: {amortizationSchedule.length}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <FormControl size="small">
                  <InputLabel>Entries</InputLabel>
                  <Select
                    value={entriesPerPage}
                    label="Entries"
                    onChange={handleChangeEntries}
                  >
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
                    backgroundColor: theme.palette.mode === "dark" ? "#1E1E1E" : "#F5F5F5",
                    borderRadius: 1,
                  }}
                />
              </Box>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default HOME;
