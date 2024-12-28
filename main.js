const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

blogForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    // Get user input
    const name = document.getElementById('name').value.trim();
    const blogContent = document.getElementById('blogContent').value.trim();

    if (name && blogContent) {
        try {
            // Save the blog post to Firestore
            await db.collection('blogs').add({
                name: name,
                content: blogContent,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });

            // Add the blog post to the DOM
            const blogPost = document.createElement('div');
            blogPost.classList.add('blog-post');

            const blogTitle = document.createElement('h3');
            blogTitle.textContent = name;

            const blogBody = document.createElement('p');
            blogBody.textContent = blogContent;

            blogPost.appendChild(blogTitle);
            blogPost.appendChild(blogBody);

            blogPosts.appendChild(blogPost);

            // Clear the form
            blogForm.reset();

            alert('Blog successfully posted!');
        } catch (error) {
            console.error('Error adding blog to Firestore: ', error);
            alert('Failed to post blog. Please try again.');
        }
    } else {
        alert('Please fill out all fields!');
    }
});
