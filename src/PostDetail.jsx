import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchComments } from './api';
import {
  Card,
  CircularProgress,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  Box,
} from '@mui/material';

export function PostDetail({ post }) {
  const {
    data: comments,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['comments', post.id],
    queryFn: () => fetchComments(post.id),
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
