// display icons that match the url
// Populating References
// When you fetch posts and want to include the user details 
// for each post's author, you can use the .populate() method:

// javascript
// Copy code
// Post.find().populate('author').then(posts => {
//   console.log(posts);
// });
// This will fetch all posts along with 
// the user details of their authors by 
// automatically fetching the referenced user 
// documents based on the ObjectId in the author field.