import React from "react";
import { useState } from "react";
import Navbar from "./navbar";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Alert,
  Collapse,
} from "@mui/material";

function Report() {
  const [formdata, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    status: "",
    location: "",
    date: "",
    reportedBy: "",
    imageUrl: null,
  });

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const updatedData = {
            ...formdata,
            status: "lost",
            reportedBy: localStorage.getItem("userId"),
          };
          const formDataToSend = new FormData();
          for (const key in updatedData) {
            formDataToSend.append(key, updatedData[key]);
          }
        
    
      const response = await fetch("http://localhost:8080/lostfound/add", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.status == 201) {
        setAlertMessage("Item reported successfully!");
        setAlertOpen(true);
        setAlertSeverity("success");
        setFormData({
          title: "",
          category: "",
          description: "",
          location: "",
          status: "",
          reportedBy: "",
          date: "",
          imageUrl: null,
        });
      } else {
        setAlertMessage("Failed to report item.");
        setAlertOpen(true);
        setAlertSeverity("error");
      }
    } catch (err) {
      console.error(err);
      setAlertMessage("Something went wrong!");
      setAlertSeverity("error");
      setAlertOpen(true);
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              Report Lost Item
            </Typography>

            <Collapse in={alertOpen}>
              <Alert
                severity={alertSeverity}
                onClose={() => setAlertOpen(false)}
                sx={{ mb: 2 }}
              >
                {alertMessage}
              </Alert>
            </Collapse>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextField
                name="title"
                label="Item Name"
                variant="outlined"
                value={formdata.title}
                onChange={handleChange}
                required
              />
              <TextField
                name="description"
                label="Description"
                variant="outlined"
                multiline
                rows={3}
                value={formdata.description}
                onChange={handleChange}
                required
              />
              <TextField
                name="location"
                label="Lost Location"
                variant="outlined"
                value={formdata.location}
                onChange={handleChange}
                required
              />
              <TextField
                name="category"
                label= "Category"
                variant="outlined"
                value={formdata.category}
                onChange={handleChange}
                required
              />
              <TextField
                name="date"
                type="date"
                value={formdata.date}
                onChange={handleChange}
                required
                placeholder="Select date"
              />
              <Button variant="outlined" component="label">
                Upload Image
                <input
                  type="file"
                  name="imageUrl"
                  hidden
                  accept="image/*"
                  onChange={handleChange}
                />
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default Report;
