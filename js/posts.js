
//Get a reference to the HTML element with the ID 'postsContainer'
const postsContainer = document.getElementById('postsContainer');
let page = 1; // number of pages to fetch
let loading = false; // Flag to prevent multiple fetches

function fetchPosts() {
    if (loading) return; // If there is already a fetch in progress, return
    loading = true; // Start loading

    // Fetch posts from the JSONPlaceholder API
    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=6`)
        .then(response => response.json()) // Convert the response to JSON
        .then(posts => { // Handle the JSON data
            if(posts.length > 0) {
                posts.forEach(post => { // Loop through the posts
                    const postDiv = document.createElement('div'); // Create a div for each post
                    postDiv.classList.add('post'); // Add the 'post' class to the div
                    postDiv.innerHTML = ` 
                        <h2>${post.title}</h2>
                        <p>${post.body}</p>
                    `; // Add the post title and body to the div
                    postsContainer.appendChild(postDiv); // Add the div to the postsContainer
                });
                page++; // Increment the page number
            } else {
             console.log('No more posts to fetch'); 
            }
            loading = false; // Done loading
        })
        .catch(error => { // Handle any errors
            console.error('Error fetching posts:', error);
            loading = false; // Done loading
        });
}

// function to check if the user has scrolled to the bottom of the page
function checkScroll() { 
    console.log('Scroll:', window.scrollY, window.innerHeight, document.body.offsetHeight); // Log the scroll position
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) { // Check if the user has scrolled to the bottom of the page
        fetchPosts(); // Fetch more posts 
    }
}

// event listener that checks for scrolling
window.addEventListener('scroll', checkScroll);

// Fetch posts when the page loads
fetchPosts();


/*The dynamic content loading is working for my laptop screen, but i have not been able
  To make it completely work for my lager connected screen. The layout is the same, but the page is not taking inn 
  new posts. One way I found that will work is to change the limit for the amount of posts that will load when the 
  page is loading to 9. But this way the posts will start to automaticly load and the footer will not appear when 
  the page loads.*/
