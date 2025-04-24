import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Grid,
  Container
} from '@mui/material';

function Hero() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:8080/lostfound/all', {
          method: 'GET',
          headers: {
            'Content-type': 'application/json'
          }
        });

        const result = await response.json();
        setData(result);
        
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };

    fetchItems();
  }, []);

  return (
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
                  <Typography gutterBottom variant="h6" component="div">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Description: {item.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Status: {item.status}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Contact: {item.reportedBy.phone}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Location: {item.location}
                  </Typography>
                  <Typography variant="caption" display="block" color="text.secondary">
                    Reported by: {item?.reportedBy?.name} ({item?.reportedBy?.email})
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Hero;
