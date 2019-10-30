const btnGetCSS = document.querySelector('#btnGetCSS')
const btnGetJS = document.querySelector('#btnGetJS')
const btnGetHTML = document.querySelector('#btnGetHTML')
const btnGetXML = document.querySelector('#btnGetXML')
const btnGetJSON = document.querySelector('#btnGetJSON')
const btnGetNextPage = document.querySelector('#btnGetNextPage')
const ulPages = document.querySelector('#pages')

const getRequest = (url, callback) => {
  const method = 'GET'
  const xhr = new XMLHttpRequest()
  xhr.open(method, url)
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        callback(xhr.response)
      } else {
        console.error(`request ${url} failure`)
      }
    }
  }
  xhr.send()
}

btnGetCSS.addEventListener('click', () => {
  getRequest('/style.css', (res) => {
    const style = document.createElement('style')
    style.innerHTML = res
    document.head.appendChild(style)
  })
})

btnGetJS.addEventListener('click', () => {
  getRequest('2.js', (res) => {
    const script = document.createElement('script')
    script.innerHTML = res
    document.body.appendChild(script)
  })
})

btnGetHTML.addEventListener('click', () => {
  getRequest('3.html', (res) => {
    const container = document.createElement('template')
    container.innerHTML = res
    document.body.appendChild(container.content)
  })
})

btnGetXML.addEventListener('click', () => {
  const url = '/4.xml'
  const method = 'GET'
  const xhr = new XMLHttpRequest()
  xhr.open(method, url)
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const content = xhr.responseXML
      const message = content
        .getElementsByTagName('warning')[0]
        .textContent.trim()
      alert(message)
    }
  }
  xhr.send()
})

btnGetJSON.addEventListener('click', () => {
  getRequest('/5.json', (res) => {
    const obj = JSON.parse(res)
    console.log(obj)
  })
})

btnGetNextPage.addEventListener(
  'click',
  (() => {
    let page = 2
    return () => {
      if (page <= 3) {
        getRequest('/page' + page, (res) => {
          const lis = JSON.parse(res).forEach((item) => {
            const li = document.createElement('li')
            li.textContent = item.id
            ulPages.appendChild(li)
          })
        })
        page++
      } else {
        btnGetNextPage.disabled = true
        btnGetNextPage.innerHTML = '没有下一页'
      }
    }
  })(),
)
