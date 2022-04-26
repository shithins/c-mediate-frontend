import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import comimg from "../../images/img1.webp";
import './Admin.css'
import Axios from '../../constant/axios'
import { errorToast, infoToast } from "../../constant/toast";

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
const [complaints,setComplaints]=React.useState([])
const [loading, setLoading] = React.useState(true);

React.useEffect(() => {
Axios.get('/admin/complaint/bRequest').then(({data})=>{
setLoading(false)
    if(data.status){
        setComplaints(data.complaint)
    }else infoToast(data.message||'something wrong try again')
}).catch(e=>{
    setLoading(false)
    errorToast(e.message||'network error')
})    
}, []);


  return (
    <div className="admin-main">
<div className="admin-table">
<CustomizedTables complaints={complaints} />
</div>
      <div className="adminpop">
      <div className="admin-content">
      <p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text 
      used in laying out print, graphic or web designs. The passage is attributed
      to an unknown typesetter in the 15th century who is thought to have scrambled
        parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. 
        It usually begins with:
      “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
      incididunt ut labore et dolore magna aliqua.”
      The purpose of lorem ipsum is to create a natural looking block of text (
        sentence, paragraph, page, etc.) that doesn't distract from the layout. 
        A practice not without controversy, laying out pages with meaningless filler text
        can be very useful when the focus is meant to be on design, not content.
        Lorem ipsum, or lipsum as it is sometimes known, is dummy text 
      used in laying out print, graphic or web designs. The passage is attributed
      to an unknown typesetter in the 15th century who is thought to have scrambled
        parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. 
        It usually begins with:
      “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
      incididunt ut labore et dolore magna aliqua.”
      The purpose of lorem ipsum is to create a natural looking block of text (
        sentence, paragraph, page, etc.) that doesn't distract from the layout. 
        A practice not without controversy, laying out pages with meaningless filler text
        can be very useful when the focus is meant to be on design, not content.Lorem ipsum, or lipsum as it is sometimes known, is dummy text 
        used in laying out print, graphic or web designs. The passage is attributed
        to an unknown typesetter in the 15th century who is thought to have scrambled
          parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. 
          It usually begins with:
        “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
        incididunt ut labore et dolore magna aliqua.”
        The purpose of lorem ipsum is to create a natural looking block of text (
          sentence, paragraph, page, etc.) that doesn't distract from the layout. 
          A practice not without controversy, laying out pages with meaningless filler text
          can be very useful when the focus is meant to be on design, not content.</p>
          <img src={comimg} />
          <h4>Added :- 00/00/0000</h4>
          <div className="report-count">
        <label>No.of Reports</label>
        <h3>50</h3>
        </div>
        <button>Block</button>
        <button>Close</button>
            </div>
      </div>
    </div>
  );
};

export default Adminpage;

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  
];

function CustomizedTables({complaints}) {
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
            {
                complaints.length === 0 && <StyledTableRow >No complaints</StyledTableRow>
            }
          {complaints.length !==0 && complaints.map((com) => (
            <StyledTableRow key={com._id}>
              <StyledTableCell component="th" scope="row">
                {com.message.substring(0,20)}
              </StyledTableCell>
              <StyledTableCell align="right">{new Date(com.date).toLocaleDateString()}</StyledTableCell>
              <StyledTableCell align="right">{com.userId}</StyledTableCell>
              <StyledTableCell align="right">{com.report}</StyledTableCell>
              <StyledTableCell align="right"><button className="openadminpop-btn">Open</button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
