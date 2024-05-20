import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchComments } from './api';
import {
  CircularProgress,
  Typography,
  Button,
  List,
  ListItem,
  Box,
  Stack,
} from '@mui/material';

// we could also use the updateMutation for our last api endpoint but this is coming from JSONPlaceholder
// the goal was just to display what the behavior would look like if an actual backend was being called.
// we display a spinner and an alert for each button click so this is good for demonstration purposes only
export function PostDetail({ post, deleteMutation, handleUpdateAlert }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const {
    data: comments,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['comments', post.id], // we need to specify the postId in order to refetch what is needed (we now have separate queries as needed)
    queryFn: () => fetchComments(post.id), // this runs an anonymous function for us to fetch the comments
  });

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

  const handleUpdateTitle = async () => {
    try {
      setIsUpdating(true);
      // Simulate updating the post title
      // In a real app, you would perform the update operation here
      await new Promise((resolve) => setTimeout(resolve, 1000));
      handleUpdateAlert('Post title updated successfully!');
    } catch (error) {
      console.error('Error updating post title:', error);
      handleUpdateAlert('Failed to update post title');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeletePost = async () => {
    try {
      setIsDeleting(true);
      await deleteMutation.mutateAsync(post.id);
      handleUpdateAlert('Post deleted successfully!');
    } catch (error) {
      console.error('Error deleting post:', error);
      handleUpdateAlert('Failed to delete post');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {isDeleting ? (
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
      ) : (
        <>
          <Typography
            variant='h5'
            sx={{ color: 'blue' }}
          >
            {post.title}
          </Typography>
          <Stack
            direction='row'
            spacing={2}
            alignItems='center'
          >
            <Button
              variant='contained'
              color='secondary'
              onClick={handleDeletePost}
            >
              Delete
            </Button>
            <Button
              variant='contained'
              color='primary'
              onClick={handleUpdateTitle}
            >
              Update title
            </Button>
            {/* Render the spinner only when deleting or updating */}
            {(isDeleting || isUpdating) && <CircularProgress size={250} />}
          </Stack>
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
      )}
    </>
  );
}
