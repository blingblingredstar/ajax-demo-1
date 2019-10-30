const http = require('http')
const fs = require('fs')
const url = require('url')
const port = process.argv[2]

if (!port) {
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true)
  const pathWithQuery = req.url
  let queryString = ''
  if (pathWithQuery.includes('?')) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'))
  }
  const path = parsedUrl.pathname
  const query = parsedUrl.query
  const method = req.method

  console.log('有个傻子发请求过来啦！路径（带查询参数）为：' + pathWithQuery)

  if (path === '/index.html' || path === '/') {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html;charset=utf-8')
    const content = fs.readFileSync('public/index.html').toString()
    const json = fs.readFileSync('db/1.json').toString()
    const lis = JSON.parse(json)
      .map((item) => `<li>${item.id}</li>`)
      .join('')
    const newContent = content.replace(
      '{{ content }}',
      `<ul id="pages">${lis}</ul>`,
    )
    res.write(newContent)
    res.end()
  } else if (path === '/main.js') {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/javascript;charset=utf-8')
    const content = fs.readFileSync('public/main.js')
    res.write(content)
    res.end()
  } else if (path === '/style.css') {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/css;charset=utf-8')
    const content = fs.readFileSync('public/style.css')
    res.write(content)
    res.end()
  } else if (path === '/2.js') {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/javascript;charset=utf-8')
    const content = fs.readFileSync('public/2.js')
    res.write(content)
    res.end()
  } else if (path === '/3.html') {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html;charset=utf-8')
    const content = fs.readFileSync('public/3.html')
    res.write(content)
    res.end()
  } else if (path === '/4.xml') {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/xml;charset=utf-8')
    const content = fs.readFileSync('public/4.xml')
    res.write(content)
    res.end()
  } else if (path === '/5.json') {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json;charset=utf-8')
    const content = fs.readFileSync('public/5.json')
    res.write(content)
    res.end()
  } else if (path === '/page2') {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json;charset=utf-8')
    const content = fs.readFileSync('db/2.json')
    res.write(content)
    res.end()
  } else if (path === '/page3') {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json;charset=utf-8')
    const content = fs.readFileSync('db/3.json')
    res.write(content)
    res.end()
  } else {
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/html;charset=utf-8')
    res.write(`你输入的路径不存在对应的内容`)
    res.end()
  }
})

server.listen(port)

console.log(
  '监听 ' +
    port +
    ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' +
    port,
)
