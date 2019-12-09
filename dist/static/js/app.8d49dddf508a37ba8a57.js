webpackJsonp([1],{107:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(182),a=n.n(o),i=n(181),r=n.n(i),s=n(183),l=n.n(s);e.default={name:"app",components:{Login:a.a,BookMark:r.a,Todo:l.a},data:function(){return{activeName:"first"}},methods:{handleClick:function(t,e){console.log(t,e)}}}},108:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{value:"",form:{name:"",region:"",date1:"",date2:"",delivery:!1,type:[],resource:"",desc:""}}},mounted:function(){var t=chrome.extension.getBackgroundPage();document.getElementById("clear").onclick=function(){t.clearBookmarks()},document.getElementById("clearonline").onclick=function(){var e=document.getElementById("filename").value;if(""!==e&&void 0!==e){(new t.Github).delete("bookmarks/"+e,"删除"+e)}else alert("未选定文件名")},document.getElementById("upload").onclick=function(){var e=document.getElementById("filename").value;if(""!==e&&void 0!==e){(new t.Github).updateTags("bookmarks/"+e)}else alert("未选定文件名")},document.getElementById("download").onclick=function(){var e=document.getElementById("filename").value;if(""!==e&&void 0!==e){(new t.Github).get("bookmarks/"+e)}else alert("未选定文件名")},(new t.Github).getlist("bookmarks/",document.querySelector("#greetings"),document.querySelector("#count-repo"))},methods:{onSubmit:function(){console.log("submit!")},clear:function(){alert("1clear")}}}},109:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(53);e.default={data:function(){return{ruleForm:{url:"",token:""},rules:{url:[{required:!0,message:"请输入仓库完整URL地址",trigger:"blur"},{min:3,max:100,message:"请输入仓库完整URL地址",trigger:"blur"}],token:[{required:!0,message:"请输入私有访问接口Token",trigger:"blur"},{min:3,max:100,message:"请输入私有访问接口Token",trigger:"blur"}]}}},mounted:function(){var t=this,e=["username","repos","token","localnum"],n=void 0,o=void 0,a=void 0,i=void 0,r=chrome.extension.getBackgroundPage();chrome.storage.local.get(e,function(e){n=e.username,o=e.repos,a=e.token,i=e.localnum,""!==i&&void 0!==i||r.countBookmarks(document.querySelector("#count-local")),t.ruleForm.url="https://github.com/"+n+"/"+o,t.ruleForm.token=a})},methods:{submitForm:function(t){var e=this;this.$refs[t].validate(function(t){if(!t)return console.log("error submit!!"),!1;console.log("submit success",e.ruleForm);var n=e.ruleForm.url.split("/"),a=n[n.length-2],i=n[n.length-1],r=e.ruleForm.token;o.a.set({username:a,repos:i,token:r}),chrome.storage.local.set({username:a,repos:i,token:r},function(){(new(chrome.extension.getBackgroundPage().Github)).create("todo/create"),chrome.notifications.create(null,{type:"basic",iconUrl:"img/icon.png",title:"保存配置",message:"认证配置成功"})})})},resetForm:function(t){this.$refs[t].resetFields()}}}},110:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(54),a=n.n(o),i=n(53),r=n(184),s=n.n(r);e.default={components:{TodoItem:s.a},data:function(){return{online:!1,v1:!1,v2:!1,v3:!1,v4:!1,show:!0,selectClass:"a_info",content:"",textarea:"",dialogVisible:!1,store:{a_info:{name:"记录",list:[]},b_important:{name:"重要",list:[]},c_urgency:{name:"紧急",list:[]}}}},created:function(){this.init()},mounted:function(){(new(chrome.extension.getBackgroundPage().Github)).getlist("todo/",document.querySelector("#todo_greetings"),"")},methods:{openonline:function(t){this.online=t},upload:function(){var t=this;i.a.get("easyTodoStorage").then(function(e){var n=document.getElementById("todo_filename").value;if(""!==n&&void 0!==n){(new(chrome.extension.getBackgroundPage().Github)).updateTodo("todo/"+n,e),t.v1=!1,t.$message({type:"success",message:"同步上传成功"})}else t.$message({type:"danger",message:"未选定文件名"})})},clearonline:function(){var t=document.getElementById("todo_filename").value;if(""!==t&&void 0!==t){(new(chrome.extension.getBackgroundPage().Github)).delete("todo/"+t,"删除"+t),this.$message({type:"success",message:"删除远程完成"})}else this.$message({type:"danger",message:"未选定文件名"});this.v4=!1},download:function(){var t=document.getElementById("todo_filename").value;if(""!==t&&void 0!==t){(new(chrome.extension.getBackgroundPage().Github)).getTodo("todo/"+t,i.a),this.$message({type:"success",message:"下载同步完成"})}else this.$message({type:"danger",message:"未选定文件名"});this.v2=!1},doClear:function(){i.a.set({easyTodoStorage:{a_info:{name:"记录",list:[]},b_important:{name:"重要",list:[]},c_urgency:{name:"紧急",list:[]}}}),this.v3=!1,this.$message({type:"success",message:"清空完毕"})},init:function(){var t=this;i.a.get("easyTodoStorage").then(function(e){t.$set(t.$data,"store",e||{a_info:{name:"记录",list:[]},b_important:{name:"重要",list:[]},c_urgency:{name:"紧急",list:[]}})})},doConfirm:function(t){if(""===t.trim())return this.$message({type:"warning",message:"不能为空哦"});this.store[this.selectClass].list.splice(0,0,{content:t,showBody:!1,remind:""}),this.content="",this.textarea="",this.dialogVisible=!1,this.setStore()},setStore:function(){var t=this.store;for(var e in t){var n=t[e].list,o=!0,r=!1,s=void 0;try{for(var l,c=a()(n);!(o=(l=c.next()).done);o=!0){var u=l.value;u.showBody=!1,u.remind&&(u.remind=u.remind.toString())}}catch(t){r=!0,s=t}finally{try{!o&&c.return&&c.return()}finally{if(r)throw s}}}i.a.set({easyTodoStorage:t})},showTextArea:function(){this.textarea=this.content,this.dialogVisible=!0}}}},111:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(54),a=n.n(o);e.default={props:["type","data"],data:function(){return{pickerOptions0:{disabledDate:function(t){return t.getTime()<Date.now()-864e5}}}},filters:{date2str:function(t){var e=new Date(t),n=e.getMonth()+1,o=e.getDate();return n<10&&(n="0"+n),o<10&&(o="0"+o),n+"-"+o}},computed:{remindLength:function(){return this.data.list.filter(function(t){return t.remind}).length}},created:function(){var t=this;this.$nextTick(function(){t.setDatePickerDefault()})},methods:{setDatePickerDefault:function(){var t=!0,e=!1,n=void 0;try{for(var o,i=a()(this.data.list);!(t=(o=i.next()).done);t=!0){var r=o.value;this.$set(r,"remind",r.remind||"")}}catch(t){e=!0,n=t}finally{try{!t&&i.return&&i.return()}finally{if(e)throw n}}},deleteList:function(t){this.$delete(this.data.list,t),this.setStore()},dateChange:function(t){this.data.list[t].read=!1,this.setStore()},setStore:function(){this.$emit("saved")}}}},112:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(5),a=n.n(o),i=n(83),r=n.n(i),s=n(80),l=n.n(s),c=n(81),u=(n.n(c),n(82));n.n(u);a.a.use(l.a),a.a.config.productionTip=!1,new a.a({el:"#app",template:"<App/>",components:{App:r.a}})},175:function(t,e){},176:function(t,e){},180:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA1UlEQVQ4T6WT6xEBQRCEuzOQATKQgZMJESgREIIMyIAMkIEQTgRk0GrU7pW9fVjMv62a/ubRs8SfwZxe0gTACcADwIxkm8otATYATDQyCMltNUDSAMABQONERwALktZNEFEHTmyt2wjvcXWjBJAUwFpdZnaz6o+SApwBTDOAC0k/1islBbDFDX8CuPnvpdMgGRQNHpLmAHYfbsvc2PucPqDUvte0JMcRQJIdzrrysjs3ug4k1VT3/BtJu9DYBZ8hyezydpp9Zm8Upb9gFbyo+fozVe4CT3b1SRGGGH2EAAAAAElFTkSuQmCC"},181:function(t,e,n){function o(t){n(176)}var a=n(22)(n(108),n(187),o,null,null);t.exports=a.exports},182:function(t,e,n){var o=n(22)(n(109),n(188),null,null,null);t.exports=o.exports},183:function(t,e,n){var o=n(22)(n(110),n(189),null,null,null);t.exports=o.exports},184:function(t,e,n){function o(t){n(175)}var a=n(22)(n(111),n(185),o,null,null);t.exports=a.exports},185:function(t,e,n){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"todo-item",class:t.type},[o("div",{staticClass:"el-card box-card"},[o("div",{staticClass:"el-card__header"},[o("div",{staticClass:"clearfix card-header"},[o("el-row",[o("el-col",{attrs:{span:4}},[t._v(t._s(t.data.name))]),t._v(" "),o("el-col",{staticClass:"text-right",attrs:{span:20}},[t._v("\n\t\t\t\t\t\t\t共有待办 "+t._s(t.data.list.length)+" 条，提醒 "+t._s(t.remindLength)+" 条\n\t\t\t\t\t\t")])],1)],1)]),t._v(" "),o("div",{staticClass:"el-card__body scrollbar"},t._l(t.data.list,function(e,a){return o("div",{staticClass:"text list-item"},[o("el-row",[o("el-col",{attrs:{span:e.remind?14:22}},[o("p",{staticClass:"text-ellipsis",staticStyle:{cursor:"pointer"},on:{click:function(n){e.showBody=!e.showBody,t.dateValueIndex=a}}},[o("span",{class:"el-icon-caret-"+(e.showBody?"bottom":"right")}),t._v("\n\t\t\t\t\t\t\t\t"+t._s(e.content)+"\n                            ")])]),t._v(" "),o("el-col",{directives:[{name:"show",rawName:"v-show",value:e.remind,expression:"item.remind"}],staticClass:"text-center",attrs:{span:8}},[o("span",{staticClass:"list-item-remind",class:t.type+"-back"},[o("img",{staticStyle:{height:"12px","margin-top":"4px"},attrs:{src:n(180)}}),t._v("\n                                "+t._s(t._f("date2str")(e.remind))+"\n                                "),o("i",{staticStyle:{cursor:"pointer"},on:{click:function(t){e.remind=""}}},[t._v("×")])])]),t._v(" "),o("el-col",{staticClass:"text-right",attrs:{span:2}},[o("span",{staticClass:"el-icon-circle-cross",staticStyle:{cursor:"pointer"},on:{click:function(e){return t.deleteList(a)}}})])],1),t._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:e.showBody,expression:"item.showBody"}],staticClass:"list-item-body"},[t._v("\n\t\t\t\t\t\t"+t._s(e.content)+"\n\n\t\t\t\t\t\t"),o("div",{staticStyle:{"margin-top":"5px"}},[t._v("\n\t\t\t\t\t\t\t设置提醒：\n\n\t\t\t\t\t\t\t"),o("el-date-picker",{attrs:{type:"date",size:"mini",placeholder:"选择日期"},on:{change:function(e){return t.dateChange(a)}},model:{value:e.remind,callback:function(n){t.$set(e,"remind",n)},expression:"item.remind"}})],1)])],1)}),0)])])},staticRenderFns:[]}},186:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("el-tabs",{attrs:{type:"card"},on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[n("el-tab-pane",{attrs:{label:"备忘录",name:"first"}},[n("todo")],1),t._v(" "),n("el-tab-pane",{attrs:{label:"书签管理",name:"third"}},[n("book-mark")],1),t._v(" "),n("el-tab-pane",{attrs:{label:"云笔记",name:"fourth"}},[t._v("定时任务补偿")]),t._v(" "),n("el-tab-pane",{attrs:{label:"权限管理",name:"second"}},[n("login")],1)],1),t._v(" "),t._m(0)],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"text-right text",staticStyle:{"margin-top":"15px"}},[t._v("\n\t本插件已开源至 "),n("a",{staticStyle:{color:"#20a0ff",outline:"none"},attrs:{href:"http://github.com/lflxp/Easy-todo",target:"_blank"}},[t._v("lflxp / Easy-todo")])])}]}},187:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-row",[n("el-col",{attrs:{span:24}},[n("section",[n("div",{staticClass:"message-wrapper"},[n("div",{staticClass:"counter"},[n("div",[t._v("本地有"),n("strong",{attrs:{id:"count-local"}},[t._v("--")]),t._v("条书签")]),t._v(" "),n("div",[t._v("线上有"),n("strong",{attrs:{id:"count-repo"}},[t._v("--")]),t._v("个备份版本")])])])])])],1),t._v(" "),n("el-row",[n("div",{staticStyle:{"margin-bottom":"20px"}},[n("input",{staticStyle:{width:"100%","margin-top":"20px",height:"30px"},attrs:{type:"text",name:"greeting",id:"filename",list:"greetings",placeholder:"选取备份文件（可自定义输入）"}}),t._v(" "),n("datalist",{staticStyle:{display:"none"},attrs:{id:"greetings"}})])]),t._v(" "),n("el-row",{attrs:{gutter:20}},[n("el-col",{attrs:{span:6}},[n("el-button",{staticStyle:{width:"100%"},attrs:{type:"primary",icon:"el-icon-upload2",id:"upload"}},[t._v("全量同步上传")])],1),t._v(" "),n("el-col",{attrs:{span:6}},[n("el-button",{staticStyle:{width:"100%"},attrs:{type:"success",icon:"el-icon-download",id:"download"}},[t._v("全量同步下载")])],1),t._v(" "),n("el-col",{attrs:{span:6}},[n("el-button",{staticStyle:{width:"100%"},attrs:{type:"danger",id:"clearonline"}},[t._v("删除远程书签")])],1),t._v(" "),n("el-col",{attrs:{span:6}},[n("el-button",{staticStyle:{width:"100%"},attrs:{type:"danger",id:"clear"}},[t._v("删除本地书签")])],1)],1)],1)},staticRenderFns:[]}},188:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:t.ruleForm,"status-icon":"",rules:t.rules,"label-width":"100px"}},[n("el-form-item",{attrs:{label:"仓库地址",prop:"url"}},[n("el-input",{attrs:{type:"text"},model:{value:t.ruleForm.url,callback:function(e){t.$set(t.ruleForm,"url",e)},expression:"ruleForm.url"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"私有Token",prop:"token"}},[n("el-input",{attrs:{type:"password"},model:{value:t.ruleForm.token,callback:function(e){t.$set(t.ruleForm,"token",e)},expression:"ruleForm.token"}})],1),t._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.submitForm("ruleForm")}}},[t._v("保存配置")]),t._v(" "),n("el-button",{on:{click:function(e){return t.resetForm("ruleForm")}}},[t._v("重置")])],1)],1)},staticRenderFns:[]}},189:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-row",{directives:[{name:"show",rawName:"v-show",value:t.online,expression:"online"}],staticStyle:{"margin-bottom":"10px"},attrs:{gutter:10}},[n("el-col",{attrs:{span:12}},[n("input",{staticStyle:{width:"100%",height:"35px"},attrs:{type:"text",name:"todo_greeting",id:"todo_filename",list:"todo_greetings",placeholder:"选取备份文件（可自定义输入）"}}),t._v(" "),n("datalist",{staticStyle:{display:"none"},attrs:{id:"todo_greetings"}})]),t._v(" "),n("el-col",{attrs:{span:3}},[n("el-popover",{attrs:{placement:"top",width:"160"},model:{value:t.v1,callback:function(e){t.v1=e},expression:"v1"}},[n("p",[t._v("确定上传吗？")]),t._v(" "),n("div",{staticStyle:{"text-align":"right",margin:"0"}},[n("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(e){t.v1=!1}}},[t._v("取消")]),t._v(" "),n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.upload(t.content)}}},[t._v("确定")])],1),t._v(" "),n("el-button",{staticStyle:{width:"100%"},attrs:{slot:"reference",type:"primary"},slot:"reference"},[t._v("上传")])],1)],1),t._v(" "),n("el-col",{attrs:{span:3}},[n("el-popover",{attrs:{placement:"top",width:"160"},model:{value:t.v2,callback:function(e){t.v2=e},expression:"v2"}},[n("p",[t._v("确定下载覆盖吗？")]),t._v(" "),n("div",{staticStyle:{"text-align":"right",margin:"0"}},[n("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(e){t.v2=!1}}},[t._v("取消")]),t._v(" "),n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.download(t.content)}}},[t._v("确定")])],1),t._v(" "),n("el-button",{staticStyle:{width:"100%"},attrs:{slot:"reference",type:"success"},slot:"reference"},[t._v("下载")])],1)],1),t._v(" "),n("el-col",{attrs:{span:3}},[n("el-popover",{staticStyle:{padding:"5px"},attrs:{placement:"top",width:"160"},model:{value:t.v4,callback:function(e){t.v4=e},expression:"v4"}},[n("p",[t._v("确定删除远程数据吗？")]),t._v(" "),n("div",{staticStyle:{"text-align":"right",margin:"0"}},[n("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(e){t.v4=!1}}},[t._v("取消")]),t._v(" "),n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.clearonline()}}},[t._v("确定")])],1),t._v(" "),n("el-button",{staticStyle:{width:"100%"},attrs:{slot:"reference",type:"danger"},slot:"reference"},[t._v("远程清空")])],1)],1),t._v(" "),n("el-col",{attrs:{span:3}},[n("el-popover",{attrs:{placement:"top",width:"160"},model:{value:t.v3,callback:function(e){t.v3=e},expression:"v3"}},[n("p",[t._v("确定清空本地数据吗？")]),t._v(" "),n("div",{staticStyle:{"text-align":"right",margin:"0"}},[n("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(e){t.v3=!1}}},[t._v("取消")]),t._v(" "),n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.doClear()}}},[t._v("确定")])],1),t._v(" "),n("el-button",{staticStyle:{width:"100%"},attrs:{slot:"reference",type:"danger"},slot:"reference"},[t._v("本地清空")])],1)],1)],1),t._v(" "),n("el-row",{attrs:{gutter:10}},[n("el-col",{attrs:{span:18}},[n("el-input",{staticClass:"top-input",class:t.selectClass,attrs:{placeholder:"请输入内容",icon:"edit","on-icon-click":t.showTextArea},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.doConfirm(t.content)}},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}},[n("el-select",{attrs:{slot:"prepend"},slot:"prepend",model:{value:t.selectClass,callback:function(e){t.selectClass=e},expression:"selectClass"}},[n("el-option",{attrs:{label:"记录",value:"a_info"}}),t._v(" "),n("el-option",{attrs:{label:"重要",value:"b_important"}}),t._v(" "),n("el-option",{attrs:{label:"紧急",value:"c_urgency"}})],1)],1)],1),t._v(" "),n("el-col",{attrs:{span:3}},[n("el-button",{staticStyle:{width:"100%"},attrs:{type:"primary"},on:{click:function(e){return t.doConfirm(t.content)}}},[t._v("确定")])],1),t._v(" "),n("el-col",{attrs:{span:3}},[n("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},on:{change:t.openonline},model:{value:t.online,callback:function(e){t.online=e},expression:"online"}})],1)],1),t._v(" "),n("el-row",{staticStyle:{"margin-top":"20px"},attrs:{type:"flex",justify:"space-between",gutter:20}},t._l(t.store,function(e,o){return n("el-col",{attrs:{span:8}},[n("todo-item",{attrs:{type:o,data:e},on:{saved:t.setStore}})],1)}),1),t._v(" "),n("el-dialog",{attrs:{title:"输入待办事项",visible:t.dialogVisible,size:"large"},on:{"update:visible":function(e){t.dialogVisible=e}}},[n("el-input",{attrs:{type:"textarea",rows:5,placeholder:"请输入内容"},model:{value:t.textarea,callback:function(e){t.textarea=e},expression:"textarea"}}),t._v(" "),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.doConfirm(t.textarea)}}},[t._v("确 定")])],1)],1)],1)},staticRenderFns:[]}},53:function(t,e,n){"use strict";var o=n(115),a=n.n(o),i=n(113),r=(n.n(i),n(17)),s=(n.n(r),{});s.set=function(t){chrome.storage.sync.set(t)},s.get=function(t){return new a.a(function(e){chrome.storage.sync.get(t,function(n){e(n[t])})})},e.a=s},81:function(t,e){},82:function(t,e){},83:function(t,e,n){var o=n(22)(n(107),n(186),null,null,null);t.exports=o.exports}},[112]);
//# sourceMappingURL=app.8d49dddf508a37ba8a57.js.map