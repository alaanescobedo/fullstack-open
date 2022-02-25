const totalLikes = (blogs) => {
  const allLikes = blogs.reduce((acc, current) => {
    return acc + current.likes
  }, 0)
  return allLikes
}

module.exports = {
  totalLikes
}
