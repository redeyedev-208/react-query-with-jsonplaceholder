import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchComments } from './api';
import {
  CircularProgress,
  Typography,
  Button,
  List,
  ListItem,
  Box,
} from '@mui/material';

export function PostDetail({ post, deleteMutation }) {
  const {
    data: comments,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['comments', post.id], // we need to specify the postId in order to refetch what is needed (we now have separate queries as needed)
    queryFn: () => fetchComments(post.id), // this runs an anonymous function for us to fetch the comments
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
        Oops, sometimes we use up all our request in a free tier, upgrade or
        wait for the month to reset...
      </Typography>
    );
  }

  return (
    <>
      <Typography
        variant='h5'
        sx={{ color: 'blue' }}
      >
        {post.title}
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, marginY: 2 }}>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => deleteMutation.mutate(post.id)}
        >
          Delete
        </Button>
        <Button
          variant='contained'
          color='primary'
        >
          Update title
        </Button>
      </Box>
      <Typography variant='body1'>{post.body}</Typography>
      <Typography variant='h6'>Comments</Typography>
      <List>
        {comments.map((comment) => (
          <ListItem key={comment.id}>
            {comment.email}: {comment.body}
          </ListItem>
        ))}
      </List>
    </>
  );
}
