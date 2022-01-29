const dummy = (blogs) => {
    return 1
}
  
const favoriteBlog = (blogs) => {

    const blogLiked = blogs.find(x => x.likes === Math.max(...blogs.map(blog=>blog.likes))) 
    const { title,author, likes } = blogLiked
    // console.log(`typeof author`, typeof author)
    const returnBlog = [
        {
            author,
            title, 
            likes: Number(likes)
        }
    ]
    return returnBlog
}

const totalLikes = (blogs) => {
    const reducer = (likes,blogs) => likes+blogs.likes
    return blogs.reduce(reducer, 0)
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}