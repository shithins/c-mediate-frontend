import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import "./Admin.css";
import Axios from "../../constant/axios";
import { errorToast, infoToast, successToast } from "../../constant/toast";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Swal from "sweetalert2";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Adminpage = () => {
  const [complaints, setComplaints] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [blLoading,setBl]=React.useState(false)
  const [reLoading,setRe]=React.useState(false)
  const [currentComplaint, setCurrentComplaint] = React.useState({});

  React.useEffect(() => {
    Axios.get("/admin/complaint/bRequest")
      .then(({ data }) => {
        setLoading(false);
        if (data.status) {
          setComplaints(data.complaint);
        } else infoToast(data.message || "something wrong try again");
      })
      .catch((e) => {
        setLoading(false);
        errorToast(e.message || "network error");
      });
  }, []);

  const blockHandler = () => {
    Swal.fire({
      title: "Are you sure?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Block",
    }).then((result) => {
      if (result.isConfirmed) {
        setBl(true);
        Axios.post("/admin/complaint/block", { _id: currentComplaint._id })
          .then(({ data }) => {
            setBl(false);
            if (data.status) {
              successToast("complaint blocked");
              setComplaints(
                complaints.filter((i) => i._id !== currentComplaint._id)
              );
              setCurrentComplaint({});
            } else infoToast(data.message || "failed to block");
          })
          .catch((e) => {
            setBl(false);
            errorToast(e.message || "network error");
          });
      }
    });
  };

  const rejectHandler = () => {
    Swal.fire({
      title: "Are you sure?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Reject",
    }).then((result) => {
      if (result.isConfirmed) {
        setRe(true);
        Axios.get("/admin/complaint/" + currentComplaint._id)
          .then(({ data }) => {
            setRe(false);
            if (data.status) {
              successToast("complaint reject");
              setComplaints(
                complaints.filter((i) => i._id !== currentComplaint._id)
              );
              setCurrentComplaint({});
            } else infoToast(data.message || "failed to reject");
          })
          .catch((e) => {
            setRe(false);
            errorToast(e.message || "network error");
          });
      }
    });
  };
  return (
    <div className="admin-main">
      <div className="admin-table">
        <CustomizedTables
          complaints={complaints}
          setCurrentComplaint={setCurrentComplaint}
          loading={loading}
        />
      </div>
      {currentComplaint._id && (
        <div className="adminpop">
          <div className="admin-content">
            <p>{currentComplaint?.message}</p>
            {currentComplaint.image && (
              <img src={currentComplaint?.image?.url} />
            )}
            <h4>
              Added :- {new Date(currentComplaint.date).toLocaleDateString()}
            </h4>
            <div className="report-count">
              <label>No.of Reports</label>
              <h3>{currentComplaint.report}</h3>
            </div>
            <button className="adminpopBlock-btn" onClick={blockHandler}>
              {blLoading ? (
                <Box sx={{ width: "100%" }}>
                  Blocking
                  <LinearProgress />
                </Box>
              ) : (
                "Block"
              )}
            </button>
            <button className="adminpopReject-btn" onClick={rejectHandler}>
              {reLoading ? (
                <Box sx={{ width: "100%" }}>
                  Rejecting
                  <LinearProgress />
                </Box>
              ) : (
                "Reject"
              )}
            </button>
            <button
              className="adminpopClose-btn"
              onClick={() => setCurrentComplaint({})}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Adminpage;

function CustomizedTables({ complaints, setCurrentComplaint ,loading }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Message</StyledTableCell>
            <StyledTableCell align="right">Added Date</StyledTableCell>
            <StyledTableCell align="right">User id</StyledTableCell>
            <StyledTableCell align="right">NO of reports</StyledTableCell>
            <StyledTableCell align="right">Options</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {loading && (
            <StyledTableRow>
              <LinearProgress />
            </StyledTableRow>
          )}
          {complaints.length === 0 && (
            <StyledTableRow>No complaints</StyledTableRow>
          )}
          {complaints.length !== 0 &&
            complaints.map((com) => (
              <StyledTableRow key={com._id}>
                <StyledTableCell component="th" scope="row">
                  {com.message.substring(0, 20)}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {new Date(com.date).toLocaleDateString()}
                </StyledTableCell>
                <StyledTableCell align="right">{com.userId}</StyledTableCell>
                <StyledTableCell align="right">{com.report}</StyledTableCell>
                <StyledTableCell align="right">
                  <button
                    className="openadminpop-btn"
                    onClick={() => setCurrentComplaint(com)}
                  >
                    Open
                  </button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
