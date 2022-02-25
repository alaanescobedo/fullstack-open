const totalLikes = (listBlogs) => {
  const allLikes = listBlogs.reduce((acc, current) => {
    return acc + current.likes
  }, 0)
  return allLikes
}
const favoriteBlog = (listBlogs) => {
  if (listBlogs.length === 0) return null

  const favorite = listBlogs.reduce((acc, current) => {
    return acc.likes > current.likes ? acc : current
  }, { likes: 0 })
  return favorite
}

module.exports = {
  totalLikes,
  favoriteBlog
}
