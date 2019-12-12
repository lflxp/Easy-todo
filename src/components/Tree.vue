<template>
<div>
  <div style="margin-bottom: 15px;">
    <el-input placeholder="请输入内容" v-model="input1" @keyup.enter.native="searched()">
      <el-button @click="newone()" slot="prepend">新增</el-button>
      <el-button slot="append" @click="searched()">搜索</el-button>
    </el-input>
  </div>
  <el-table
    v-if="show1"
    element-loading-text="加载中..."
    v-loading="listLoading"
    :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    lazy
    :load="load"
    size="mini"
    tooltip-effect="dark"
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
    <!-- <el-table-column
      prop="type"
      label="类型"
      sortable
      width="180">
    </el-table-column> -->
    <el-table-column
      prop="name"
      label="文件名"
      sortable
      width="180">
      <template slot-scope="scope">
        <el-button type="text" @click="getContents(scope.row.path,scope.row.sha)" v-if="scope.row.hasChildren === true?false: true">{{ scope.row.name }}</el-button>
        <span v-else>{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="html_url"
      label="在线查看">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="right">
          <p>{{ scope.row.html_url }}</p>
          <div slot="reference" class="name-wrapper">
            <a :href="scope.row.html_url" target="_blank">查看</a>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      prop="path"
      label="路径">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>{{ scope.row.path }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium" type="danger">{{ scope.row.path }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      prop="size"
      label="文件大小">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>SHA: {{ scope.row.sha }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium" type="success">{{ scope.row.size }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      prop="op"
      label="操作">
      <template slot-scope="scope">
        <el-button type="danger" size="mini" @click="deleted(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div style="text-align: center;margin-top: 30px;">
    <el-pagination
      background
      @size-change="handleSizeChange"
      layout="total,sizes,prev, pager, next,jumper"
      :page-sizes="[5,10, 20, 50, 100, 200, 300, 400]"
      :page-size="pagesize"
      :total="total"
      @current-change="cChange"
      :current-page="currentPage">
    </el-pagination>
  </div>
  <el-dialog :visible.sync="dialogTableVisible" width="90%" top="0" :show-close="false">
    <div slot="title">
      <el-tooltip class="item" effect="dark" content="路径分层用 / 分割，最多一级路径，eg: 笔记/20190801.md" placement="bottom">
        <el-input placeholder="请输入搜索内容，in:file,name,description,readme" v-model="currentPath">
          <template slot="prepend">文件路径</template>
          <el-button slot="append" @click="updates()">提交</el-button>
        </el-input>
      </el-tooltip>
    </div>
    <markdown-editor v-model="content" v-if="showmarkdown"/>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogTableVisible = false" type="primary" style="width: 100%">取 消</el-button>
    </div>
  </el-dialog>
</div>
</template>
<script>
  import MarkdownEditor from '@/components/markdown'
  export default {
    components: {
      MarkdownEditor
    },
    data() {
      return {
        visible: false,
        input1: '',
        currentSha: '',
        currentPath: '',
        showmarkdown: true,
        content: '19870828',
        dialogTableVisible: false,
        listLoading: true,
        total: 0,
        pagesize:5,
        currentPage:1,
        show1: true,
        tableData: [{
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          hasChildren: true
        }, {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          children: [{
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              id: 32,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
          }]
        }, {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        notebook: '',
        url: 'https://api.github.com',
        user: '',
        repos: '',
        token: '',
        sha: ''
      }
    },
    mounted() {
      this.init()
      // this.get()
    },
    methods: {
      searched() {
        if (this.input1 === '') {
          this.get()
        } else {
          // fetch(this.url + '/search/code?q=' + this.input1 + '+in:file,name,description+repo:' + this.user + '/' + this.repos, {
          fetch(this.url + '/search/code?q=' + this.input1 + '+in:file,name,description,readme+repo:' + this.user + '/' + this.repos, {
            method: 'GET',
            headers: new Headers({
              'Content-Type': 'application/json',
              'Authorization': 'token ' + this.token
            })
          }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then((response) => {
            console.log('github delete success',response)
            
            if (response.total_count !== 0) {
              this.$message({
                type: 'success',
                message: '找到结果数: ' + response.total_count
              })
              this.total = response.total_count
              this.listLoading = SVGComponentTransferFunctionElement
              this.currentPage = 1
              this.tableData = []
              response.items.forEach((data,index) => {
                let tmp = data
                tmp['id'] = index
                this.tableData.push(tmp)
              })
              this.total = this.tableData.length
              this.show1 = false
              this.$nextTick(()=>{
                this.show1 = true
                this.listLoading = false
              })
            } else {
              this.$message({
                type: 'warning',
                message: '未找到任何结果'
              })
              this.tableData = []
              this.total = 0
              this.currentPage = 1
            }
          })
        }
      },
      deleted(row) {
        var data = {
          'message': 'delete ' + row['path'],
          'branch': 'master',
          'sha': row['sha']
        }

        this.$message({
          type: 'success',
          message: '已提交删除操作'
        })

        fetch(this.url + '/repos/' + this.user + '/' + this.repos + '/contents/' + row['path'], {
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
            title: 'NoteBook删除',
            message: '远程NoteBook ' + row['path'] + ' 删除完毕！'
          })
        })
      },
      newone() {
        this.content = ''
        this.currentPath = ''
        this.dialogTableVisible = true
        this.showmarkdown = false
        this.$nextTick(() => {
          this.showmarkdown = true
        })
      },
      init() {
        let _this = this
        let key = ['username', 'repos', 'token', 'notebook']
        let username;
        let repos;
        let token;
        let localnum;
        let notebook;

        chrome.storage.local.get(key, function (result) {
          username = result.username;
          repos = result.repos;
          token = result.token;
          notebook = result.notebook;

          _this.user = username
          _this.repos = repos
          _this.token = token
          _this.notebook = notebook
          _this.get()
        })
      },
      updates() {
        this.dialogTableVisible = false
        // chrome.bookmarks.getChildren('1',(re) => {
        var data = {
          'message': '更新文件 ' + this.notebook + '/' +this.currentPath + this.currentSha,
          'content': window.btoa(unescape(encodeURIComponent(this.content))),
          'sha': this.currentSha
        }

        this.$message({
          type: 'success',
          message: '已提交更新操作'
        })

        fetch(this.url + '/repos/' + this.user + '/' + this.repos + '/contents/' + this.notebook+ '/' + this.currentPath, {
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
            title: '更新文件错误',
            message: error
          })
        })
        .then((response) => {
          chrome.notifications.create(null, {
            type: 'basic',
            iconUrl: 'images/icon16.png',
            title: '更新notebook',
            message: '成功 ' + this.notebook + '/' +this.currentPath
          })
        })
      },
      cChange(cpage) {
        this.currentPage = cpage
      },
      handleSizeChange(size) {
        this.pagesize = size
      },
      getContents(path,sha) {
        fetch(this.url + '/repos/' + this.user + '/' + this.repos + '/contents/' + path, {
          method: 'GET',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'token ' + this.token
          })
        }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then((result) => {
            console.log('getContents',result)
            this.dialogTableVisible = true
            this.content = decodeURIComponent(escape(window.atob(result['content'])))
            this.currentPath = path.replace('notebook/','')
            this.currentSha = sha
            this.showmarkdown = false
            this.$nextTick(() => {
              this.showmarkdown = true
            })
          })
      },
      get() {
        fetch(this.url + '/repos/' + this.user + '/' + this.repos + '/contents/' + this.notebook, {
          method: 'GET',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'token ' + this.token
          })
        }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then((result) => {
            console.log('get',result)
            this.tableData = []
            result.forEach((data,index) => {
              let tmp = data
              tmp['id'] = index
              if (tmp['type'] === 'dir') {
                tmp['hasChildren'] = true
              }
              this.tableData.push(tmp)
            })
            this.total = this.tableData.length
            this.show1 = false
            this.$nextTick(()=>{
              this.show1 = true
              this.listLoading = false
            })
          })
      },
      load(tree, treeNode, resolve) {
        console.log('load',tree,treeNode,resolve)
        fetch(this.url + '/repos/' + this.user + '/' + this.repos + '/contents/' + tree['path'], {
          method: 'GET',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'token ' + this.token
          })
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then((result) => {
          console.log('get',result)
          let tmpData = []
          result.forEach((data,index) => {
            let tmp = data
            tmp['id'] = index + this.total
            if (tmp['type'] === 'dir') {
              tmp['hasChildren'] = true
            }
            tmpData.push(tmp)
          })
          resolve(tmpData)
        })
      }
    },
  }
</script>