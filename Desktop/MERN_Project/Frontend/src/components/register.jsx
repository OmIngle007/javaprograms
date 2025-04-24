import { useState } from "react"
import {
    Box,
    TextField,
    Button,
    Card,
    CardContent,
    Typography,
    Container,
    Alert,
    Collapse
} from "@mui/material";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate()
    const [formdata, setformdata] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        phone: ""
    });
    const [error, setError] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);
    const [severity, setSeverity] = useState('error');

    const handleSubmit = async (e) => {
        e.preventDefault()

        try{
            const response = await fetch("http://localhost:8080/auth/register", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: (JSON.stringify(formdata)),
            });
            
            if(response.status == 201) {
                setSeverity('success');
                setError('Registered successfully!');
                setAlertOpen(true);
                setTimeout(() => {
                navigate('/login');
                }, 1000);
            }
            else{
                setSeverity('error')
                if(response.status == 409) {
                    setError('User Already Exists');
                }
                else{
                    setError("something went wrong")
                }
                setAlertOpen(true)

            }

        }
        catch(err) {
            console.error("error:", err);
            setSeverity('error');
            setError('Something went wrong');
            setAlertOpen(true);

        }

    }
    return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh", // Full viewport height
            background: `url(${logo}) center/cover no-repeat`, // Background image
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(255, 255, 255,)", // Semi-transparent overlay
              zIndex: -1,
              overflow: "hidden",
            }}
          ></Box>
    
          <Container maxWidth="sm">
            <Card
              sx={{
                backdropFilter: "blur(1px)", // Blurry background for the card
                background: "rgba(255, 255, 255, 0.4)", // Semi-transparent white background to let the blur show
              }}
            >
              <CardContent>
                <Typography variant="h5" align="center" gutterBottom>
                  Register
                </Typography>
    
                <Collapse in={alertOpen}>
                  <Alert
                    severity={severity}
                    onClose={() => setAlertOpen(false)}
                    sx={{ mb: 2 }}
                  >
                    {error}
                  </Alert>
                </Collapse>
    
                <form onSubmit={handleSubmit}>
                  <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formdata.username}
                    onChange={(e) => setformdata({...formdata, username:e.target.value})}
                  />
                  <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formdata.name}
                    onChange= {(e) => setformdata({...formdata, name:e.target.value})} 
                    />
                  <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={formdata.password}
                    onChange={(e) => setformdata({...formdata, password:e.target.value})}
                  />
                  <TextField
                    label="email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formdata.email}
                    onChange= {(e) => setformdata({...formdata, email:e.target.value})} 
                    />
                    <TextField
                    label="Phone"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formdata.phone}
                    onChange= {(e) => setformdata({...formdata, phone:e.target.value})} 
                    />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginTop: "16px" }}
                  >
                    Register
                  </Button>
                  
                </form>
              </CardContent>
            </Card>
          </Container>
        </Box>
      );

}

export default Register