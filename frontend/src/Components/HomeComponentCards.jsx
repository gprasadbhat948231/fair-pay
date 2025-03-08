import { Typography } from "@mui/material";
import "./Homecomponent.css";
const HomeComponentCards = ({ heading }) => {
  return (
    <div className="homepagecard-container">
      <Typography
        align="center"
        sx={{
          height: "30px",
          backgroundColor: "#df73407a",
          padding:'5px',
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px'
        }}
      >
        {heading}
      </Typography>
    </div>
  );
};
export default HomeComponentCards;
