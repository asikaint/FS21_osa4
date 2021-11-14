const dummy = (blogs) => {
    return 1
}
  
const totalLikes = (blogs) => {
    const reducer = (likes,blogs) => likes+blogs.likes
    return blogs.reduce(reducer, 0)
}

module.exports = {
    dummy,
    totalLikes
}