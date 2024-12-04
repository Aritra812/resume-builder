import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import CodeIcon from "@mui/icons-material/Code";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../redux/profileSlice";
import { Link, useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { validateFields } from "../utils/validateFields";

const Profile = () => {
  const dispatch = useDispatch();
  const currentProfile = useSelector((state) => state.profileDetails);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  // console.log("Profilepage:", currentProfile);

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(updateProfile({ [name]: value }));

    // Clear the specific error for this field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear the error for the updated field
    }));
  };

  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Handles navigation to the next page if the form is valid,
   * otherwise sets the errors state to be displayed.
   *
   * @function
   * @returns {void}
   */
  /******  1371ce29-a162-4fee-87fc-4bdf92bc156b  *******/
  const handleNavigation = () => {
    const { isValid, errors } = validateFields({
      firstName: currentProfile?.firstName,
      lastName: currentProfile?.lastName,
      email: currentProfile?.email,
      mobile: currentProfile?.mobile,
    });

    if (!isValid) {
      // Update state to display errors
      setErrors(errors);
      return; // Prevent navigation
    }

    // Navigate to the next page if validation passes
    navigate("/education");
  };

  const containerStyle = {
    marginTop: "30",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "var(--cardBg)",
  };

  return (
    <div style={containerStyle}>
      <Card>
        <CardHeader
          title={
            <Typography variant="h5" align="center" fontWeight="bold">
              Personal Details
            </Typography>
          }
        />
      </Card>
      <CardContent>
        <div>
          <Grid container spacing={2} alignItems="center" lg={12}>
            <Grid item md={6} sm={12} xs={12} lg={6}>
              <TextField
                margin="dense"
                variant="outlined"
                type="text"
                name="firstName"
                label="FirstName"
                style={{ width: "100%" }}
                required
                value={currentProfile?.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <PersonIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item md={6} sm={12} xs={12} lg={6}>
              <TextField
                margin="dense"
                variant="outlined"
                type="text"
                name="lastName"
                label="LastName"
                style={{ width: "100%" }}
                required
                value={currentProfile?.lastName}
                onChange={handleChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <PersonIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center" lg={12}>
            <Grid item md={6} sm={12} xs={12} lg={6}>
              <TextField
                margin="dense"
                variant="outlined"
                type="email"
                name="email"
                label="Email"
                style={{ width: "100%" }}
                required
                value={currentProfile?.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <EmailIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item md={6} sm={12} xs={12} lg={6}>
              <TextField
                margin="dense"
                variant="outlined"
                type="number"
                name="mobile"
                label="MobileNo"
                style={{ width: "100%" }}
                required
                value={currentProfile?.mobile}
                onChange={handleChange}
                error={!!errors.mobile}
                helperText={errors.mobile}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <PhoneIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                inputProps={{ maxLength: 10 }}
              />
            </Grid>
          </Grid>
          {/* <Grid container spacing={2} alignItems="center" lg={12}>
            <Grid item md={12} sm={12} xs={12} lg={12}>
              <TextField
                margin="dense"
                variant="outlined"
                type="text"
                name="aboutMe"
                label="About Me"
                multiline
                rows={2}
                fullWidth
                style={{ width: "100%" }}
                value={currentProfile?.aboutMe}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <PersonIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid> */}
          <Grid container spacing={2} alignItems="center" lg={12}>
            <Grid item md={12} sm={12} xs={12} lg={12}>
              <TextField
                margin="dense"
                variant="outlined"
                type="text"
                name="address"
                label="Address"
                multiline
                rows={1}
                fullWidth
                style={{ width: "100%" }}
                value={currentProfile?.address}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <HomeIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center" lg={12}>
            <Grid item md={6} sm={12} xs={12} lg={6}>
              <TextField
                margin="dense"
                variant="outlined"
                type="text"
                name="linkedIn"
                label="Linked In"
                style={{ width: "100%" }}
                value={currentProfile?.linkedIn}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <LinkedInIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item md={6} sm={12} xs={12} lg={6}>
              <TextField
                margin="dense"
                variant="outlined"
                type="text"
                name="github"
                label="Github"
                style={{ width: "100%" }}
                value={currentProfile?.github}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <GitHubIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center" lg={12}>
            <Grid item md={6} sm={12} xs={12} lg={6}>
              <TextField
                margin="dense"
                variant="outlined"
                type="text"
                name="codechef"
                label="Codechef"
                style={{ width: "100%" }}
                value={currentProfile?.codechef}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <CodeIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item md={6} sm={12} xs={12} lg={6}>
              <TextField
                margin="dense"
                variant="outlined"
                type="text"
                name="leetcode"
                label="Leetcode"
                style={{ width: "100%" }}
                value={currentProfile?.leetcode}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <CodeIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center" lg={12}>
            <Grid item md={12} sm={12} xs={12} lg={12}>
              <TextField
                margin="dense"
                variant="outlined"
                type="text"
                name="codeforces"
                label="Codeforces"
                style={{ width: "100%" }}
                value={currentProfile?.codeforces}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <CodeIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </div>
      </CardContent>

      <Grid container spacing={2} alignItems="center" lg={12}>
        <Grid item md={12} sm={12} xs={12} lg={12} style={containerStyles}>
          <Button onClick={handleNavigation} style={linkStyle}>
            <h4>Education Section</h4>
            <ArrowForwardIcon style={iconStyle} />
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

const linkStyle = {
  textDecoration: "none",
  color: "inherit",
  display: "flex",
  justifyContent: "end",
  alignItems: "center",
  gap: "5px",
  transition: "border-radius 0.3s", // Add transition for border-radius
  borderRadius: "4px", // Initial border-radius
  padding: "5px", // Add padding for hover effect
};

const containerStyles = {
  marginBottom: "20px",
  display: "flex",
  justifyContent: "end",
  alignItems: "center",
  // backgroundColor: 'crimson',
  marginTop: "20px",
  paddingRight: "40px",
};
const iconStyle = {
  verticalAlign: "middle", // Align icon vertically with text
  marginLeft: "5px", // Add margin between icon and text
};
export default Profile;
