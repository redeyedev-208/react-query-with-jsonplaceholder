import React, { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
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
const maxPostPage = 10;

export function Posts() {
  // when coming frmo an actual api we can use (0), this api with JSONPlaceholder though starts at 1
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);

  // asynchronous calls make it difficult to keep track of the current page and it's changes
  const queryClient = useQueryClient();

  // Note: Due to hoisting variables with var, let, or const are moved up of the block scope or their containing function
  // To see this error all you need to do is move this section above the useEffect
  // There will be an arror stating "Rendered more hooks than during the previous render" due to how wer are conditionally rendering this CircularProgress component
  // const has block scope and we ensure that the hook is conditionally invoked along with any other conditionally rendering logic
  // anytime the current page changes we are going to run this funcion
  // it wil run the pre-fetch query
  useEffect(() => {
    // let's prevent some side effects, so that we are out of bounds in a sense
    // since JSONPlaceholder can return up to 100 results we set it to 10 for brevit, just calling that out
    if (currentPage < maxPostPage) {
      const nextPage = currentPage + 1;
      // this needs to have the sampe shape as useQuery (important)
      queryClient.prefetchQuery({
        queryKey: ['posts', nextPage],
        queryFn: () => fetchPosts(nextPage),
      });
    }
  }, [currentPage, queryClient]);

  const { data, isError, isLoading, isFetching } = useQuery({
    queryKey: ['posts', currentPage],
    queryFn: () => fetchPosts(currentPage + 1),
    // there are various approaches to consider and it is always best to read the docs to accomodate your specific use case
    // keepPreviousData: true, Note: Only use this if you need to keep the cache but we can stick with the staleTime for conciseness
    staleTime: 3000,
  });

  if (isError) {
    return (
      <Typography
        variant='h6'
        color='error'
      >
        Oops, you have reached your api call monthly threshold, please upgrade
        or wait until your allowable limit call is refreshed...
      </Typography>
    );
  }

  // you can always play around and switch the conditional with isFetching to see the difference between the two
  // difference being on completely disregarding any cached data when using isFetching (doesn't care about cached data)
  // let's add some styling for the Spinner which is the CircularProgress component, using the sx props
  // we then first wrap the CircularProgress component with a Box apply some styling via the sx prop that takes allows us to set the css that is desired
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
        <CircularProgress size={200} />
      </Box>
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
