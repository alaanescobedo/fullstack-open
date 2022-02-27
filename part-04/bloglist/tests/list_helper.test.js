const listHelper = require('../utils/list_helper')

const {
  listWithMultipleBlogs,
  listWithOneBlog,
  emptyList
} = require('../utils/test_helper')

describe('total likes', () => {
  test('should return the same number of likes as the object has', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(7)
  })
  test('should return the total sum of likes of all blogs', () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs)
    expect(result).toBe(36)
  })
  test('should return 0 if the list of blogs is empty', () => {
    const result = listHelper.totalLikes(emptyList)
    expect(result).toBeNull()
  })
})
describe('favorite blog', () => {
  test('should return the blog with the highest number of likes', () => {
    const favoriteOfMultipleBlogs = listHelper.favoriteBlog(listWithMultipleBlogs)
    const favoriteOfOneBlog = listHelper.favoriteBlog(listWithOneBlog)

    expect(favoriteOfMultipleBlogs).toStrictEqual(listWithMultipleBlogs[2])
    expect(favoriteOfOneBlog).toStrictEqual(listWithOneBlog[0])
  })
  test('should return null if array is empty', () => {
    const favorite = listHelper.favoriteBlog(emptyList)
    expect(favorite).toBeNull()
  })
})
describe('most blogs', () => {
  test('should return an object with the author and the number of total blogs', () => {
    const resultOfMultipleBlogs = listHelper.mostBlogs(listWithMultipleBlogs)
    const resultOfOneBlog = listHelper.mostBlogs(listWithOneBlog)

    expect(resultOfMultipleBlogs).toStrictEqual({ author: 'Robert C. Martin', blogs: 3 })
    expect(resultOfOneBlog).toStrictEqual({ author: 'Michael Chan', blogs: 1 })
  })
  test('should return null if array is empty', () => {
    const result = listHelper.mostBlogs(emptyList)
    expect(result).toBeNull()
  })
})
describe('most likes', () => {
  test('should return the blog with the highest number of likes', () => {
    const resultOfMultipleBlogs = listHelper.mostLikes(listWithMultipleBlogs)
    const resultOfOneBlog = listHelper.mostLikes(listWithOneBlog)

    expect(resultOfMultipleBlogs).toStrictEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
    expect(resultOfOneBlog).toStrictEqual({ author: 'Michael Chan', likes: 7 })
  })
  test('should return null if array is empty', () => {
    const result = listHelper.mostLikes(emptyList)
    expect(result).toBeNull()
  })
})
