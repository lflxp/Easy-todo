<template>
<div>
  <el-table
    v-if="show1"
    element-loading-text="Loading"
    v-loading="listLoading"
    :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    border
    lazy
    :load="load"
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
        <el-button type="text" @click="getContents(scope.row.path,scope.row.sha)" v-if="scope.row.type === 'file'?true: false">{{ scope.row.name }}</el-button>
        <span v-else>{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="html_url"
      label="在线查看">
      <template slot-scope="scope">
        <a :href="scope.row.html_url" target="_blank">查看</a>
      </template>
    </el-table-column>
    <el-table-column
      prop="path"
      label="路径">
    </el-table-column>
    <el-table-column
      prop="size"
      label="文件大小">
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
      :current-page="currentPage">
    </el-pagination>
  </div>
  <el-dialog :visible.sync="dialogTableVisible" :fullscreen="true">
    <markdown-editor v-model="content" v-if="showmarkdown"/>
    <div slot="footer" class="dialog-footer">
      <el-input placeholder="请输入内容" v-model="currentPath" style="margin-bottom: 20px">
        <template slot="prepend">文件路径</template>
        <el-button slot="append" @click="updates()">提交</el-button>
      </el-input>
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
        url: 'https://api.github.com',
        user: 'lflxp',
        repos: 'tags',
        token: '',
        headers: { 'Authorization': 'token ' + this.token, 'Content-type': 'application/json' },
        sha: ''
      }
    },
    mounted() {
      this.get()
    },
    methods: {
      updates() {
        this.dialogTableVisible = false
        // chrome.bookmarks.getChildren('1',(re) => {
        var data = {
          'message': '更新文件 ' + this.currentPath + this.currentSha,
          'content': window.btoa(unescape(encodeURIComponent(this.content))),
          'sha': this.currentSha
        }

        fetch(this.url + '/repos/' + this.user + '/' + this.repos + '/contents/' + this.currentPath, {
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
            title: '上传全量书签错误',
            message: error
          })
        })
        .then((response) => {
          alert('ok',response)
          chrome.notifications.create(null, {
            type: 'basic',
            iconUrl: 'images/icon16.png',
            title: '上传全量书签',
            message: '成功'
          })
        })
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
            this.currentPath = path
            this.currentSha = sha
            this.showmarkdown = false
            this.$nextTick(() => {
              this.showmarkdown = true
            })
          })
      },
      get() {
        fetch(this.url + '/repos/' + this.user + '/' + this.repos + '/contents/notebook', {
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