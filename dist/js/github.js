function getDate() {
  let myDate = new Date()
  let year = myDate.getFullYear()
  let month = myDate.getMonth() + 1
  let date = myDate.getDate()
  let h = myDate.getHours()
  let m = myDate.getMinutes()
  let s = myDate.getSeconds()
  let now = year + '-' + conver(month) + '-' + conver(date) + ' ' + conver(h) + ':' + conver(m) + ':' + conver(s)
  return now
}

//日期时间处理
function conver(s) {
  return s < 10 ? '0' + s : s
}

function Github() {
  this.user = ''
  this.repos = ''
  this.token = ''
  this.key = ['username', 'repos', 'token']

  this.url = 'https://api.github.com'
  this.tags = 'tags'
  this.session = 'session'
  this.bookmarks = 'bookmarks'

  this.stringtobase64 = function (info) {
    return window.btoa(info)
  }

  this.base64tostring = function (info) {
    return window.atob(info)
  }

  /*
   API文档：https://developer.github.com/v3/repos/contents/#create-or-update-a-file
   传输方法：PUT
   访问路径：https://api.github.com/repos/用户名/仓库名/contents/文件路径
   JSON格式：
   {
   "message": "commit from INSOMNIA",
   "content": "$sha="
   }
   */
  this.create = function (filepath) {
    var data = {
      'message': 'commit init',
      'content': 'eyJkZWZhdWx0IjpbeyJuYW1lIjoidGl0bGUiLCJ1cmwiOiJodHRwOi8vYmFpZHUuY29tIiwiaWNvbiI6IjEyMyIsInRpbWUiOiIyMDE5LTAxLTAxIn1dfQo='
    }

    chrome.storage.local.get(this.key, function (result) {
      this.url = 'https://api.github.com'
      this.user = result.username
      this.repos = result.repos
      this.token = result.token
      this.headers = { 'Authorization': 'token ' + this.token, 'Content-type': 'application/json' }
      if (this.user === '' || this.user === undefined) {
        alert('未配置认证信息')
        return
      }

      fetch(this.url + '/repos/' + this.user + '/' + this.repos + '/contents/' + filepath, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': 'token ' + this.token
        })
      }).then(res => res.json())
        .catch((error) => {
          chrome.notifications.create(null, {
            type: 'basic',
            iconUrl: 'images/icon16.png',
            title: '初始化' + filepath + '目录',
            message: error
          })
        })
        .then((response) => {
          console.log('初始化目录' + filepath + ' 成功')
        })
    })
  }

  // 获取远程列表
  this.getlist = function (filepath, element, elenum) {
    chrome.storage.local.get(this.key, function (result) {
      this.url = 'https://api.github.com'
      this.user = result.username
      this.repos = result.repos
      this.token = result.token
      this.headers = { 'Authorization': 'token ' + this.token, 'Content-type': 'application/json' }
      if (this.user === '' || this.user === undefined) {
        alert('未配置认证信息')
        return
      }

      fetch(this.url + '/repos/' + this.user + '/' + this.repos + '/contents/' + filepath, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': 'token ' + this.token
        })
      }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then((result) => {
          result.forEach((vds) => {
            if (vds.type === 'file') {
              var op = document.createElement('option');
              op.setAttribute('label', vds['name']);
              op.setAttribute('value', vds['name']);
              op.setAttribute('select', 'select')
              element.appendChild(op);
            }
          })

          if (elenum !== '') {
            elenum.innerText = result.length
          }
        })
    })
  }

  // 远程加载
  this.get = function (filepath) {
    // 全量清空 然后再加载
    chrome.bookmarks.getTree((re) => {
      chrome.storage.local.set({ 'repostatus': false }, () => {
        removeall(re)

        chrome.storage.local.get(this.key, (result) => {
          this.url = 'https://api.github.com'
          this.user = result.username
          this.repos = result.repos
          this.token = result.token
          this.headers = { 'Authorization': 'token ' + this.token, 'Content-type': 'application/json' }
          if (this.user === '' || this.user === undefined) {
            alert('未配置认证信息')
            chrome.storage.local.set({ 'repostatus': true }, () => {
              // alert('未配置认证信息 true')
              console.log('reset repostatus === true')
            })
            return
          }
  
          fetch(this.url + '/repos/' + this.user + '/' + this.repos + '/contents/' + filepath, {
            method: 'GET',
            headers: new Headers({
              'Content-Type': 'application/json',
              'Authorization': 'token ' + this.token
            })
          }).then(res => res.json())
            .catch(error => () => {
              chrome.storage.local.set({ 'repostatus': true }, () => {
                // alert('error true')
                console.log('reset repostatus === true')
              })
              console.error('Error:', error)
            })
            .then(async (result) => {
              let info = JSON.parse(decodeURIComponent(window.atob(result['content'])))
  
              try {
                await addAll(info[0].children, '')
              } catch (e) {
                // do nothing
              } finally {
                chrome.notifications.create(null, {
                  type: 'basic',
                  iconUrl: 'images/icon16.png',
                  title: '切换等待10秒',
                  message: '请勿执行书签操作，否则手工完成同步操作'
                })
                setTimeout(() => {
                  chrome.storage.local.set({ 'repostatus': true }, () => {
                    chrome.notifications.create(null, {
                      type: 'basic',
                      iconUrl: 'images/icon16.png',
                      title: '更新本地书签完成',
                      message: '启动书签自动同步功能'
                    }) 
                  })
                },10000);
                
              }
            })
        })
      })
    })
  }

    // 远程加载
    this.getTodo = function (filepath,storage) {
      chrome.storage.local.get(this.key, function (result) {
        this.url = 'https://api.github.com'
        this.user = result.username
        this.repos = result.repos
        this.token = result.token
        this.headers = { 'Authorization': 'token ' + this.token, 'Content-type': 'application/json' }
        if (this.user === '' || this.user === undefined) {
          alert('未配置认证信息')
          return
        }

        fetch(this.url + '/repos/' + this.user + '/' + this.repos + '/contents/' + filepath, {
          method: 'GET',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'token ' + this.token
          })
        }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then((result) => {
            let info = JSON.parse(decodeURIComponent(window.atob(result['content'])))

            try {
              storage.set({
                easyTodoStorage: info
              })
            } catch (e) {
              // do nothing
            } finally {
              chrome.notifications.create(null, {
                type: 'basic',
                iconUrl: 'images/icon16.png',
                title: '更新本地书签',
                message: '同步完成 '
              })
            }
          })
      })
    }

  // todo 远程同步TODOLIST
  this.updateTodo = function (filepath, message) {
    let _this = this
    chrome.storage.local.get(this.key, function (result) {
      // _this.create(filepath)
      let _this2 = this
      this.url = 'https://api.github.com'
      this.user = result.username
      this.repos = result.repos
      this.token = result.token
      if (this.user === '' || this.user === undefined) {
        alert('user is nil')
        return
      }

      var urls = this.url + '/repos/' + this.user + '/' + this.repos + '/contents/' + filepath

      fetch(urls, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': 'token ' + this.token
        })
      }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then((result) => {
          console.log('github get success' + JSON.stringify(result), result['sha'])
          // chrome.bookmarks.getChildren('1',(re) => {
          var data = {
            'message': '全量同步todo ' + getDate(),
            'content': window.btoa(encodeURIComponent(JSON.stringify(message))),
            'sha': result['sha']
          }

          fetch(urls, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: new Headers({
              'Content-Type': 'application/json',
              'Authorization': 'token ' + _this2.token
            })
          }).then(res => res.json())
            .catch((error) => {
              chrome.notifications.create(null, {
                type: 'basic',
                iconUrl: 'images/icon16.png',
                title: '上传全量书签错误',
                message: error
              })
            })
            .then((response) => {
              chrome.notifications.create(null, {
                type: 'basic',
                iconUrl: 'images/icon16.png',
                title: '上传全量书签',
                message: '成功'
              })
            })
        })
    })
  }

  // todo 远程同步
  this.updateTags = function (filepath) {
    let _this = this
    chrome.storage.local.get(this.key, function (result) {
      // _this.create(filepath)
      let _this2 = this
      this.url = 'https://api.github.com'
      this.user = result.username
      this.repos = result.repos
      this.token = result.token
      if (this.user === '' || this.user === undefined) {
        alert('user is nil')
        return
      }

      var urls = this.url + '/repos/' + this.user + '/' + this.repos + '/contents/' + filepath

      fetch(urls, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': 'token ' + this.token
        })
      }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then((result) => {
          console.log('github get success' + JSON.stringify(result), result['sha'])
          // chrome.bookmarks.getChildren('1',(re) => {
          chrome.bookmarks.getTree((re) => {
            if (result['message'] === 'Not Found') {
              console.log('not found create it')
            }
            // 'content': window.btoa(encodeURIComponent(JSON.stringify(re))),
            // 'content': window.btoa(unescape(encodeURIComponent(JSON.stringify(re)))),
            var data = {
              'message': '全量同步bookmarks ' + getDate(),
              'content': window.btoa(encodeURIComponent(JSON.stringify(re))),
              'sha': result['sha']
            }

            fetch(urls, {
              method: 'PUT',
              body: JSON.stringify(data),
              headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'token ' + _this2.token
              })
            }).then(res => res.json())
              .catch((error) => {
                chrome.notifications.create(null, {
                  type: 'basic',
                  iconUrl: 'images/icon16.png',
                  title: '上传全量书签错误',
                  message: error
                })
              })
              .then((response) => {
                chrome.notifications.create(null, {
                  type: 'basic',
                  iconUrl: 'images/icon16.png',
                  title: '上传全量书签',
                  message: '成功'
                })
              })
          })
        })
    })
  }

  /*
   传输方法：PUT
   访问路径：https://api.github.com/repos/用户名/仓库名/contents/文件路径
   JSON格式：
   {
   "message": "update from INSOMNIA",
   "content": "$sha",
   "sha": "$sha"
   }
   */
  this.update = function (filepath, message, content) {
    chrome.storage.local.get(this.key, function (result) {
      this.url = 'https://api.github.com'
      this.user = result.username
      this.repos = result.repos
      this.token = result.token
      this.headers = { 'Authorization': 'token ' + this.token, 'Content-type': 'application/json' }
      if (this.user === '' || this.user === undefined) {
        alert('user is nil')
        return
      }

      var urls = this.url + '/repos/' + this.user + '/' + this.repos + '/contents/' + filepath
      console.log('urls', urls)

      fetch(urls, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': 'token ' + this.token
        })
      }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then((result) => {
          console.log('github get success' + JSON.stringify(result), result['sha'])
          var data = {
            'message': message,
            'content': window.btoa(content),
            'sha': result['sha']
          }

          var urls = _this.url + '/repos/' + _this.user + '/' + _this.repos + '/contents/' + filepath
          console.log('urls', urls, data)

          fetch(urls, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: new Headers({
              'Content-Type': 'application/json',
              'Authorization': 'token ' + this.token
            })
          }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('github update success' + JSON.stringify(response)))
        })
    })
  }

  /*
   传输方法：DELETE
   访问路径：https://api.github.com/repos/用户名/仓库名/contents/文件路径
   JSON格式：
   {
   "message": "delete a file",
   "sha": "$sha"
   }
   */
  this.delete = function (filepath, message) {
    chrome.storage.local.get(this.key, function (result) {
      this.url = 'https://api.github.com'
      this.user = result.username
      this.repos = result.repos
      this.token = result.token
      this.headers = { 'Authorization': 'token ' + this.token, 'Content-type': 'application/json' }
      if (this.user === '' || this.user === undefined) {
        alert('user is nil')
        return
      }

      var urls = this.url + '/repos/' + this.user + '/' + this.repos + '/contents/' + filepath
      console.log('urls', urls)

      fetch(urls, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': 'token ' + this.token
        })
      }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then((result) => {
          console.log('github get success' + JSON.stringify(result), result['sha'])
          var data = {
            'message': message,
            'branch': 'master',
            'sha': result['sha']
          }

          console.log('urls', urls, data)

          fetch(urls, {
            method: 'DELETE',
            body: JSON.stringify(data),
            headers: new Headers({
              'Content-Type': 'application/json',
              'Authorization': 'token ' + this.token
            })
          }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then((response) => {
              console.log('github delete success' + JSON.stringify(response))
              chrome.notifications.create(null, {
                type: 'basic',
                iconUrl: 'images/icon16.png',
                title: '书签删除',
                message: '远程书签 ' + filepath + ' 删除完毕！'
              })
            })
        })
    })
  }
}
