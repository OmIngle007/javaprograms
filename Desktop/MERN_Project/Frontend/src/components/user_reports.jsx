import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import {
  Container,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Modal,
  Box,
  TextField,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

function UserReports() {
  const [open, setOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [data, setData] = useState([]);

  const fetchItems = async () => {
    try {
      const response = await fetch("http://localhost:8080/lostfound/all", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
      const userId = localStorage.getItem("userId");

      const result = await response.json();
      const reportedItems = result.filter(
        (item) => item.reportedBy._id === userId
      );
      console.log(reportedItems);
      setData(reportedItems)
    } catch (err) {
      console.error("Error:", err);
    }
  };
  
  useEffect(() => {
   
    fetchItems();
  }, []);

  const handleOpen = (item) => {
    setEditItem(item);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleEditChange = (e) => {
    setEditItem({ ...editItem, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:8080/lostfound/${editItem._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editItem),
      });
      if (response.status == 200) {
        fetchItems(); // Refresh the list
        handleClose();
      } else {
        console.error('Edit failed');
      }
    } catch (err) {
      console.error(err);
    }
  };


  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/lostfound/${id}`, {
        method: 'DELETE',
      });
      if (response.status == 200) {
        fetchItems(); // Refresh the list
      } else {
        console.error('Delete failed');
      }
    } catch (err) {
      console.error(err);
    }
  };



  return (
    <>
      <Navbar />
      <Container sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {data.map((item, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="160"
                  image={item.imageUrl || 'https://via.placeholder.com/300x160?text=No+Image'}
                  alt={item.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Description: {item.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Status: {item.status}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Contact: {item?.reportedBy?.phone || 'N/A'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Location: {item.location}
                  </Typography>
                  <Typography variant="caption" display="block" color="text.secondary">
                    Reported by: {item?.reportedBy?.name} ({item?.reportedBy?.email})
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
                <Button variant="outlined" size="small" onClick={() => handleOpen(item)}>
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Edit Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" mb={2}>
            Edit Item
          </Typography>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={editItem?.title || ''}
            onChange={handleEditChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={editItem?.description || ''}
            onChange={handleEditChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Category"
            name="category"
            value={editItem?.category || ''}
            onChange={handleEditChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Status"
            name="status"
            value={editItem?.status || ''}
            onChange={handleEditChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Location"
            name="location"
            value={editItem?.location || ''}
            onChange={handleEditChange}
            sx={{ mb: 2 }}
          />
          <Button fullWidth variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Modal>
    </Container>
    </>
  );
}

export default UserReports;
