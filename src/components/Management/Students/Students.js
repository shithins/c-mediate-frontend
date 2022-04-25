import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { deleteFile } from "../../../constant/functions";
import "./students.css";
import CloseIcon from "@mui/icons-material/Close";
import { errorToast, infoToast, successToast } from "../../../constant/toast";
import LinearProgress from "@mui/material/LinearProgress";
import Axios from "../../../constant/axios";
import Swal from "sweetalert2";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 25,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 20,
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

const Students = ({ setManagementpopup, setEditUser }) => {
  const [options, setOptions] = React.useState("All");
  const [profiles, setProfiles] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setLoading(true);
    setProfiles([]);
    Axios.get(`/user/get/${options}`)
      .then(({ data }) => {
        setLoading(false);
        if (data.status) {
          setProfiles(data.profile);
        } else infoToast(data.message || "somthing wrong");
      })
      .catch((e) => {
        setLoading(false);
        errorToast(e.message || "network error");
      });
  }, [options]);

  return (
    <div className="blockedPro-main">
      <div className="listOPtions-btns">
        <button
          className="Moption-btn"
          onClick={() => setOptions(options === "All" ? "Blocked" : "All")}
        >
          {options}
        </button>
        <button
          onClick={() => setOptions(options === "Old" ? "All" : "Old")}
          className="Mpass-btn"
        >
          Students
        </button>
        <button
          onClick={() => setOptions(options === "staff" ? "All" : "staff")}
          className="Mpass-btn"
        >
          Staffs
        </button>
        <button
          className="Mclose-btn"
          onClick={() => setManagementpopup("close")}
        >
          <CloseIcon />
        </button>
      </div>
      <CustomizedTables
        options={options}
        profiles={profiles}
        loading={loading}
        setProfiles={setProfiles}
        setManagementpopup={setManagementpopup}
        setEditUser={setEditUser}
      />
    </div>
  );
};

export default Students;

function CustomizedTables({
  options,
  profiles,
  loading,
  setProfiles,
  setManagementpopup,
  setEditUser,
}) {
  const unBlockHandler = (_id) => {
    Swal.fire({
      title: "Are you sure?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Unblock",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.post("/user/unblock", { _id })
          .then(({ data }) => {
            if (data.status) {
              successToast("unBlocked ");
              setProfiles(profiles.filter((i) => i._id !== _id));
            } else infoToast(data.message || "failed to unblock");
          })
          .catch((e) => errorToast(e.message || "network error"));
      }
    });
  };

  const deleteAllHandler = (pro, status) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText:status?"Delete Staff": "Delete all",
    }).then((result) => {
      if (result.isConfirmed) {
        infoToast("It may take too long");
        infoToast("Deleting users");
        Axios.post("/user/delete/allOld", {
          profile: status ? [pro] : profiles,
        })
          .then(({ data }) => {
            if (data.status) {
              infoToast("Deleting files");
              for (let i in data.Ids) {
                deleteFile(data.Ids[i], "complaints");
              }
              successToast("Deleted all users");
            } else infoToast("failed to delete users");
          })
          .catch((e) => errorToast(e.message || "network error"));
      }
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 600, marginBottom: 5 }}
        aria-label="customized table"
      >
        <TableHead>
          {options === "Blocked" && (
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Mobile</StyledTableCell>
              <StyledTableCell align="right">NO of reports</StyledTableCell>
              <StyledTableCell align="right">Blocked date</StyledTableCell>

              <StyledTableCell align="right">Options</StyledTableCell>
            </TableRow>
          )}
          {options === "All" && (
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Mobile</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="right">Role</StyledTableCell>
              <StyledTableCell align="right">Options</StyledTableCell>
            </TableRow>
          )}
          {options === "Old" && (
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Mobile</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="right">Added Date</StyledTableCell>

              <StyledTableCell align="right">
                <button className="MdeleteAll-btn" onClick={deleteAllHandler}>
                  Delete all
                </button>
              </StyledTableCell>
            </TableRow>
          )}
          {options === "staff" && (
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Mobile</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="right">Added Date</StyledTableCell>
              <StyledTableCell align="right">Options</StyledTableCell>
            </TableRow>
          )}
        </TableHead>
        <TableBody>
          {loading && (
            <StyledTableRow>
              <LinearProgress />
            </StyledTableRow>
          )}
          {!loading && profiles.length === 0 && (
            <StyledTableRow>
              <center>No profiles</center>
            </StyledTableRow>
          )}
          {options === "All" &&
            profiles.map((pro) => (
              <StyledTableRow key={pro._id}>
                <StyledTableCell component="th" scope="row">
                  {pro.name}
                </StyledTableCell>
                <StyledTableCell align="right">{pro.mobile}</StyledTableCell>
                <StyledTableCell align="right">
                  {pro.status ? "Registered" : "Not registered"}
                </StyledTableCell>
                <StyledTableCell align="right">{pro.role}</StyledTableCell>
                <StyledTableCell align="right">
                  <button
                    onClick={() => {
                      setEditUser(pro);
                      setManagementpopup("edituser");
                    }}
                  >
                    Edit
                  </button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          {options === "Blocked" &&
            profiles.map((pro) => (
              <StyledTableRow key={pro._id}>
                <StyledTableCell component="th" scope="row">
                  {pro.name}
                </StyledTableCell>
                <StyledTableCell align="right">{pro.mobile}</StyledTableCell>
                <StyledTableCell align="right">{pro.block}</StyledTableCell>
                <StyledTableCell align="right">
                  {new Date(pro.blockedDate).toLocaleDateString()}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <button
                    className="Munblock-btn"
                    onClick={() => unBlockHandler(pro._id)}
                  >
                    Unblock
                  </button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          {options === "Old" &&
            profiles.map((pro) => (
              <StyledTableRow key={pro._id}>
                <StyledTableCell component="th" scope="row">
                  {pro.name}
                </StyledTableCell>
                <StyledTableCell align="right">{pro.mobile}</StyledTableCell>
                <StyledTableCell align="right">
                  {pro.status ? "Registered" : "Not registered"}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {new Date(pro.addedDate).toLocaleDateString()}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          {options === "staff" &&
            profiles.map((pro) => (
              <StyledTableRow key={pro._id}>
                <StyledTableCell component="th" scope="row">
                  {pro.name}
                </StyledTableCell>
                <StyledTableCell align="right">{pro.mobile}</StyledTableCell>
                <StyledTableCell align="right">
                  {pro.status ? "Registered" : "Not registered"}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {new Date(pro.addedDate).toLocaleDateString()}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <button
                    className="MdeleteAll-btn"
                    onClick={() => deleteAllHandler(pro, true)}
                  >
                    Delete
                  </button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
