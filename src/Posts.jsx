import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from './api';
import { PostDetail } from './PostDetail';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Box,
  Divider,
} from '@mui/material';

export function Posts() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);

  const { data, isError, isLoading } = useQuery({
    queryKey: ['posts', currentPage],
    queryFn: () => fetchPosts(currentPage + 1),
    keepPreviousData: true,
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return (
      <Typography
        variant='h6'
        color='error'
      >
        Oops, you have reached your api call monthly threshold, please upgrade
        or wait until you allowable limit call is refreshed...
      </Typography>
    );
  }

  return (
    <>
      <Grid
        container
        spacing={4}
        sx={{ marginTop: 2 }}
      >
        {data.map((post) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={post.id}
          >
            <Card
              onClick={() => setSelectedPost(post)}
              sx={{ cursor: 'pointer' }}
            >
              <CardContent>
                <Typography variant='h6'>{post.title}</Typography>
                <Typography variant='body2'>{post.body}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 2,
        }}
      >
        <Button
          disabled={currentPage === 0}
          onClick={() => setCurrentPage((old) => Math.max(old - 1, 0))}
          sx={{ marginRight: 2 }}
        >
          Previous page
        </Button>
        <Typography
          component='span'
          sx={{ margin: '0 10px' }}
        >
          Page {currentPage + 1}
        </Typography>
        <Button
          disabled={data.length < 10}
          onClick={() =>
            setCurrentPage((old) => (data.length === 10 ? old + 1 : old))
          }
          sx={{ marginLeft: 2 }}
        >
          Next page
        </Button>
      </Box>
      <Divider sx={{ marginY: 4 }} />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
