# React + Vite (Blog with MUI & React Query)
This project is just used to demonstrate what we can do with `react-query`. Since we are using JSONPlaceholder it took a bit to configure the behavior we would expect from a backend (API).
We are using the Material UI V5 component library to give the layout using the following components:
- `CircularProgress`, `Typography`, `Button`, `List`, `ListItem`, `Box`, `Stack`
- We have a sticky header, where the content goes underneath when scrolled
- The use of pagination is also covered
- The updated titles, and comments also work as expected
- Alert component also displays based on the action that is needed (delete or update) mutation
- Update (I didn't add this as this isn't an actual endpoint) so I just handled the delete the same pattern applies though

## Concepts covered in this project
- Installing the needed packages (`QueryClient`, `QueryProvider`)
- Using `useQuery` for returning an object that includes either (`isLoading`, isFetching, `error`)
- Considering `staleTime` or keeping the previous data depending on what is needed
- `gcTime` where the default of time to hold onto data is something like `5 minutes`
- Decided if we need to refectch data
- Query Keys being used as a dependency array in a useEffect hook
- Handling pagination and pre-fetching
- Lastly using the `useMutation` hook for server side-effects

___

## Goal
To get a basic understanding of what we can do with the `Tanstack`, managing data and how we refetch data and manage cache accordingly. 
With this project it will give you a great starting point to get up and running. Have fun with it and you'll see that there is so much goodness that I can't even begin to talk about. My favorite part are the `devtools` which has that cool button icon that is only available in a development environment. Needed to call that out as it is not available on an actual build (production).

___

- ## Tanstack (useQuery)
We are using the tanstack which allows for fetching data along with JSONPlaceholder to mimic a backend.
Since we aren't actually mutating actual data I set this up to mimic what an end user would expect.
The layout is influeced by Skeleton UI as I like how it gives us the minimal look and feel. 
Using sx props on MUI components is how we are able to achieve the layout that has the following:
- Card Header
- Body
- Divider
- Buttons
- Spinner that renders conditionally along with an alert message
- Alert's also display depending on if the `Delete` or `Update Title` button are clicked
- The site is also fully responsive

___
## Dev Tools (Tanstack)
I also used the dev tools which allow us to look at what is taking place with the state of the data. 
This is very useful as it allows us to see how the data is in it's current state. 
For more information visit the the documentation here: [Tanstack Dev Tools](https://tanstack.com/query/latest/docs/framework/react/devtools)
- Just start on the overview section and work your way down
___

## Accessibility
Running a check on this project when it is up and running only displays one issue due to a header not being correctly set due to it being more than the heading it falls under. 
This is a mild issue and wouldn't harm anything but this is just an example of how to use the tanstack, with MUIV5 and JSONPlaceholder.
Click on the link below and install the extension and run a quick scan. Being a user who relies on assistive technologies it truly does make my life easier.
So if you haven't been exposed to accessibility, it doesn't take much to see the impact we can make. Not everyone will use software in a similar manner.
It is often the common practice to use a mouse when clicking through stuff but that isn't considering how others might experience navigation some software.
- [WCAG 2.2: Accessibility Guidelines](https://www.w3.org/TR/WCAG22/)
- [Deque: Homepage - Install Chrome Extension for free](https://www.deque.com/axe/)
___

## Project Langing Page
Here is an image of what the project will look like when it is up and running.
Feel free to download the repo if you like give me a star that would be greatly appreciated, if not as long as you start considering accessibility I'm happy. 
- Option one: download zip, navigate to your downloads folder
- Open up the terminal open up your editor of choice I used VSCode, then drag the folder into the IDE
- Then run `npm install` and you can start playing around with the Tanstack

![project-homepage-layout](https://github.com/redeyedev-208/react-query-with-jsonplaceholder/assets/60634649/dec3c6b6-9ebf-40fb-958e-5bdd2b46cef2)

<b>Project Hosted on Netlify</b>
[blog-w-react-query-mui-jsonplaceholder](https://ga-react-w-vite-tanstack.netlify.app/)
