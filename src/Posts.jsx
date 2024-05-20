import React, { useState, useEffect } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { fetchPosts, deletePost, updatePost } from './api';
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
  Alert,
} from '@mui/material';
const maxPostPage = 10;

export function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);
  const [alert, setAlert] = useState(null); // Message state

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (postId) => deletePost(postId),
  });

  const updatePost = useMutation({
    mutateFn: (postId) => updatePost(postId),
  });

  useEffect(() => {
    if (currentPage < maxPostPage) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery({
        queryKey: ['posts', nextPage],
        queryFn: () => fetchPosts(nextPage),
      });
    }
  }, [currentPage, queryClient]);

  const { data, isError, isLoading } = useQuery({
    queryKey: ['posts', currentPage],
    queryFn: () => fetchPosts(currentPage + 1),
    staleTime: 3000,
  });

  const handleUpdateAlert = (message) => {
    setAlert({ message, severity: 'success' });
    // Clear the message after 3 seconds
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  if (isError) {
    return (
      <Typography
        variant='h6'
        color='error'
      >
        Oops, you have reached your API call monthly threshold, please upgrade
        or wait until your allowable limit call is refreshed...
      </Typography>
    );
  }

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress size={250} />
      </Box>
    );
  }

  const handlePostSelect = (post) => {
    setAlert(null);
    setSelectedPost(post);
  };

  return (
    <>
      {alert && (
        <Alert
          variant='outlined'
          severity={alert.severity}
          onClose={() => setAlert(null)}
        >
          {alert.message}
        </Alert>
      )}
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
              onClick={() => handlePostSelect(post)}
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
      {alert && (
        <Alert
          variant='outlined'
          severity={alert.severity}
          onClose={() => setAlert(null)}
        >
          {alert.message}
        </Alert>
      )}
      {selectedPost && (
        <PostDetail
          post={selectedPost}
          deleteMutation={deleteMutation}
          handleUpdateAlert={handleUpdateAlert}
        />
      )}
    </>
  );
}
