<template>
    <div>
        <!-- <el-button @click="get">get</el-button>
        <el-button @click="gettree">tree</el-button>
        <el-button @click="gettreer">treer</el-button> -->
        <tree></tree>
    </div>
</template>

<script>
  import Tree from '@/components/Tree'
  export default {
    components: {
      Tree
    },
    data() {
      return {
        activeNames: ['1'],
        url: 'https://api.github.com',
        user: 'lflxp',
        repos: 'tags',
        token: '',
        headers: { 'Authorization': 'token ' + this.token, 'Content-type': 'application/json' },
        sha: ''
      }
    },
    methods: {
      get() {
        fetch(this.url + '/repos/' + this.user + '/' + this.repos + '/contents/todo', {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': 'token ' + this.token
        })
      }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then((result) => {
          console.log('get',result)
          result.forEach((data,index) => {
            console.log(data,index)
          })
        })
      },
      gettree() {
        fetch(this.url + '/repos/' + this.user + '/' + this.repos + '/git/trees/' + this.sha, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': 'token ' + this.token
        })
      }).then(res => res.json())
        .catch((error) => {
          console.log('error',error)
        })
        .then((response) => {
          console.log('gettree',response)
        })
      },
      gettreer() {
        fetch(this.url + '/repos/' + this.user + '/' + this.repos + '/git/trees/' + this.sha + '?recursive=1', {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': 'token ' + this.token
        })
      }).then(res => res.json())
        .catch((error) => {
          console.log('error',error)
        })
        .then((response) => {
          console.log('gettreer',response)
        })
      },
      handleChange(val) {
        console.log(val);
      },
      goBack() {
        console.log('go back');
      }
    }
  }
</script>