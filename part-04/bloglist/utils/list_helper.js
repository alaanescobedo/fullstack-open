const totalLikes = (listBlogs) => {
  if (listBlogs.length === 0) return null

  const allLikes = listBlogs.reduce((acc, current) => {
    return acc + current.likes
  }, 0)
  return allLikes
}
const favoriteBlog = (listBlogs) => {
  if (listBlogs.length === 0) return null

  const favorite = listBlogs.reduce((acc, current) => {
    return current.likes > acc.likes ? current : acc
  }, { likes: 0 })
  return favorite
}

const mostBlogs = (listBlogs) => {
  if (listBlogs.length === 0) return null

  const totalBlogsByAuthor = listBlogs.reduce((acc, current) => {
    acc[current.author] = acc[current.author] ? acc[current.author] + 1 : 1
    return acc
  }, {})

  const listOfTuples = Object.entries(totalBlogsByAuthor)

  const result = listOfTuples.reduce((acc, current) => {
    const blogsByAuthor = { author: current[0], blogs: current[1] }
    return blogsByAuthor.blogs > acc.blogs ? blogsByAuthor : acc
  }, { author: '', blogs: 0 })

  return result
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs
}
