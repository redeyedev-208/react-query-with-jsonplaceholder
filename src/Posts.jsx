import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPosts, deletePost, updatePost } from './api';
import { PostDetail } from './PostDetail';
const maxPostPage = 10;

// this is a quick and easy way to get up and running and start working with react-query
// normally we would be calling some backend but since we are using JSONPlaceholder we don't need to do that
// we will use our hooks now to fetch our data that we need
// the purpose of this component is to simulate fetching data from a server

export function Posts() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);

  // replace with useQuery
  // so we have this data that we will be mapping through to get the shape of our data
  // we like our data to be shaped like it is on the backend so there are no issue
  // in our data we only need the title and id so we are good to go
  // useQuery returns an {} with lots of properties which we can look at in the console when we need
  // so normally all we need to do is destructure the data -> is the return value of the query function that we are going to pass
  // lets add some options so we know what data we shaped in a specific manner, it is an object so order doesn't really matter
  // the key is always an array in version 4 and above, the queryFn will be the funciton we call from our backend "api"
  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  if (!data) {
    return <div />;
  }

  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className='post-title'
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className='pages'>
        <button
          disabled
          onClick={() => {}}
        >
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button
          disabled
          onClick={() => {}}
        >
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
