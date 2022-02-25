const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  }
]
const listWithMultipleBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]
const emptyList = []

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
