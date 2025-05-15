import "./style.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Grid } from "@mui/material";

function PrivateFooter() {
 return (
  <Grid className="containerFooter">
   <footer className="footer">
    <span>Exercise Open Air</span>
    <ul>
     <li>
      <a href="https://github.com/frankosorio4" target="_blank">
       <GitHubIcon sx={{ color: "black" }} />
      </a>
     </li>
     <li>
      <a href="https://www.linkedin.com/in/frank-david-osorio/?locale=en_US" target="_blank">
       <LinkedInIcon sx={{ color: "black" }} />
      </a>
     </li>
     <li>
      <a href="https://www.instagram.com/frank_osorio4/" target="_blank">
       <InstagramIcon sx={{ color: "black" }} />
      </a>
     </li>
    </ul>
   </footer>
  </Grid>
 );
}

export default PrivateFooter;