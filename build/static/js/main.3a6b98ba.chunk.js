(this["webpackJsonpadmin-app-demo"]=this["webpackJsonpadmin-app-demo"]||[]).push([[0],{18:function(e,s,c){e.exports={wrapper:"login_wrapper__3WAPi",formContent:"login_formContent__2Buqe",formFooter:"login_formFooter__HcGT_",inactive:"login_inactive__2arLX",active:"login_active__2-Ee7",fadeInDown:"login_fadeInDown__1VfUF",fadeIn:"login_fadeIn__297C7",first:"login_first__3rnu2",second:"login_second__Hs_Uv",third:"login_third__1kugo",fourth:"login_fourth__2O0Ba",underlineHover:"login_underlineHover__3zf7F",icon:"login_icon__35RbW",default_color:"login_default_color__3zKy7"}},40:function(e,s,c){"use strict";(function(e){var a=c(4),t=c(43),n=c(0);e.HOST="http://localhost:3000/",e.API_HOST="http://54.201.160.69:3282/",e.PROJECT_NAME="OnePantry",s.a=function(){return Object(n.jsx)("div",{class:"wrapper",children:Object(n.jsx)(a.d,{router:t.a})})}}).call(this,c(38))},43:function(e,s,c){"use strict";c.d(s,"a",(function(){return v}));var a=c(20),t=c(5),n=c(1),l=c(63),i=(c(49),c(50),c(51),c(52),c(26)),r=c.n(i),d=c(0),j=function(){Object(n.useEffect)((function(){r()("#example").DataTable()}),[]);var e=Object(n.useState)(""),s=Object(t.a)(e,2),c=s[0],a=s[1],i=Object(n.useState)(""),j=Object(t.a)(i,2),o=j[0],m=j[1],b=Object(n.useState)(""),h=Object(t.a)(b,2),O=h[0],x=h[1],u=Object(n.useState)(""),f=Object(t.a)(u,2),N=f[0],v=f[1],p=Object(n.useState)([]),g=Object(t.a)(p,2),w=g[0],_=g[1],y=localStorage.getItem("userToken");Object(n.useEffect)((function(){k(),C()}),[]);var k=function(){l.a.get("http://54.201.160.69:3282/api/v1/admin/dashboardcount",{headers:{Authorization:y}}).then((function(e){a(e.data.data.alluser),m(e.data.data.all_active),x(e.data.data.seller),v(e.data.data.user)})).catch((function(e){}))},S={headers:{Authorization:y}},C=function(){l.a.post("http://54.201.160.69:3282/api/v1/admin/listOfusers",{},S).then((function(e){_(e.data.data.search_data)})).catch((function(e){}))};return Object(d.jsx)("div",{children:Object(d.jsxs)("div",{className:"content-wrapper",children:[Object(d.jsx)("div",{className:"content-header",children:Object(d.jsx)("div",{className:"container-fluid",children:Object(d.jsxs)("div",{className:"row mb-2",children:[Object(d.jsx)("div",{className:"col-sm-6",children:Object(d.jsx)("h1",{className:"m-0 text-dark",children:"Dashboard"})}),Object(d.jsx)("div",{className:"col-sm-6",children:Object(d.jsx)("ol",{className:"breadcrumb float-sm-right",children:Object(d.jsx)("li",{className:"breadcrumb-item active",children:"Dashboard"})})})]})})}),Object(d.jsx)("section",{className:"content",children:Object(d.jsxs)("div",{className:"container-fluid",children:[Object(d.jsxs)("div",{className:"row",children:[Object(d.jsx)("div",{className:"col-lg-3 col-6",children:Object(d.jsxs)("div",{className:"small-box bg-info",children:[Object(d.jsxs)("div",{className:"inner",children:[Object(d.jsx)("h3",{children:c}),Object(d.jsx)("p",{children:"All Users"})]}),Object(d.jsx)("div",{className:"icon",children:Object(d.jsx)("i",{className:"ion ion-person-add"})}),Object(d.jsxs)("a",{href:"#",className:"small-box-footer",children:["More info ",Object(d.jsx)("i",{className:"fas fa-arrow-circle-right"})]})]})}),Object(d.jsx)("div",{className:"col-lg-3 col-6",children:Object(d.jsxs)("div",{className:"small-box bg-success",children:[Object(d.jsxs)("div",{className:"inner",children:[Object(d.jsx)("h3",{children:o}),Object(d.jsx)("p",{children:"Active Users"})]}),Object(d.jsx)("div",{className:"icon",children:Object(d.jsx)("i",{className:"ion ion-stats-bars"})}),Object(d.jsxs)("a",{href:"#",className:"small-box-footer",children:["More info ",Object(d.jsx)("i",{className:"fas fa-arrow-circle-right"})]})]})}),Object(d.jsx)("div",{className:"col-lg-3 col-6",children:Object(d.jsxs)("div",{className:"small-box bg-warning",children:[Object(d.jsxs)("div",{className:"inner",children:[Object(d.jsx)("h3",{children:O}),Object(d.jsx)("p",{children:"Seller"})]}),Object(d.jsx)("div",{className:"icon",children:Object(d.jsx)("i",{className:"ion ion-person-add"})}),Object(d.jsxs)("a",{href:"#",className:"small-box-footer",children:["More info ",Object(d.jsx)("i",{className:"fas fa-arrow-circle-right"})]})]})}),Object(d.jsx)("div",{className:"col-lg-3 col-6",children:Object(d.jsxs)("div",{className:"small-box bg-danger",children:[Object(d.jsxs)("div",{className:"inner",children:[Object(d.jsx)("h3",{children:N}),Object(d.jsx)("p",{children:"Users"})]}),Object(d.jsx)("div",{className:"icon",children:Object(d.jsx)("i",{className:"ion ion-pie-graph"})}),Object(d.jsxs)("a",{href:"#",className:"small-box-footer",children:["More info ",Object(d.jsx)("i",{className:"fas fa-arrow-circle-right"})]})]})})]}),Object(d.jsxs)("table",{id:"example",class:"display",children:[Object(d.jsx)("thead",{children:Object(d.jsxs)("tr",{children:[Object(d.jsx)("th",{children:"S.No."}),Object(d.jsx)("th",{children:"Name"}),Object(d.jsx)("th",{children:"Email"}),Object(d.jsx)("th",{children:"Status"}),Object(d.jsx)("th",{children:"Role"}),Object(d.jsx)("th",{children:"Action"})]})}),Object(d.jsx)("tbody",{children:w.map((function(e,s){return Object(d.jsxs)("tr",{children:[Object(d.jsx)("td",{children:s}),Object(d.jsx)("td",{children:e.first_name}),Object(d.jsx)("td",{children:e.email}),Object(d.jsx)("td",{children:"Status"}),Object(d.jsx)("td",{children:"Role"}),Object(d.jsx)("td",{children:"Action"})]},s)}))})]})]})})]})})},o=c(4),m=function(){var e={fontSize:"15px"},s=Object(o.n)(),c=function(e){s(e)};return Object(d.jsx)("div",{children:Object(d.jsxs)("aside",{className:"main-sidebar sidebar-dark-primary elevation-4",children:[Object(d.jsxs)("a",{href:"index3.html",className:"brand-link",children:[Object(d.jsx)("img",{src:"http://54.201.160.69:3281/assets/img/AdminLTELogo.png",alt:"AdminLTE Logo",className:"brand-image img-circle elevation-3",style:{opacity:".8"}}),Object(d.jsx)("span",{className:"brand-text font-weight-light",children:"One Pantry"})]}),Object(d.jsxs)("div",{className:"sidebar",children:[Object(d.jsxs)("div",{className:"user-panel mt-3 pb-3 mb-3 d-flex",children:[Object(d.jsx)("div",{className:"image",children:Object(d.jsx)("img",{src:"http://54.201.160.69:3282/public/assets/user_media/1675321895612--user.jpg",className:"img-circle elevation-2",alt:"User Image"})}),Object(d.jsx)("div",{className:"info",children:Object(d.jsx)("a",{href:"#",className:"d-block",children:"Admin"})})]}),Object(d.jsx)("nav",{className:"mt-2",children:Object(d.jsxs)("ul",{className:"nav nav-pills nav-sidebar flex-column","data-widget":"treeview",role:"menu","data-accordion":"false",children:[Object(d.jsx)("li",{className:"nav-item has-treeview menu-open",children:Object(d.jsxs)("a",{href:"/dashboard",className:"nav-link active",children:[Object(d.jsx)("i",{className:"nav-icon fas fa-tachometer-alt iconsize"}),Object(d.jsx)("p",{style:e,children:"Dashboard"})]})}),Object(d.jsx)("li",{className:"nav-item has-treeview",children:Object(d.jsxs)("a",{href:"/dashboard",className:"nav-link",children:[Object(d.jsx)("i",{className:"nav-icon fas fa-user-shield iconsize"}),Object(d.jsx)("p",{style:e,children:"User Management"})]})}),Object(d.jsxs)("li",{className:"nav-item has-treeview",children:[Object(d.jsxs)("a",{href:"#",className:"nav-link",children:[Object(d.jsx)("i",{className:"fas fa-sitemap iconsize nav-icon"}),Object(d.jsxs)("p",{style:e,children:["Category Management",Object(d.jsx)("i",{className:"right fas fa-angle-left"})]})]}),Object(d.jsxs)("ul",{className:"nav nav-treeview",children:[Object(d.jsx)("li",{className:"nav-item",children:Object(d.jsxs)("a",{href:"#",className:"nav-link",children:[Object(d.jsx)("i",{className:"far fa-circle nav-icon"}),Object(d.jsx)("p",{style:e,children:"Categories"})]})}),Object(d.jsx)("li",{className:"nav-item",children:Object(d.jsxs)("a",{href:"#",className:"nav-link",children:[Object(d.jsx)("i",{className:"far fa-circle nav-icon"}),Object(d.jsx)("p",{style:e,children:"Sub Categories"})]})})]})]}),Object(d.jsxs)("li",{className:"nav-item has-treeview",children:[Object(d.jsxs)("a",{href:"#",className:"nav-link",children:[Object(d.jsx)("i",{className:"fas fa-cog iconsize nav-icon"}),Object(d.jsxs)("p",{style:e,children:["Setting",Object(d.jsx)("i",{className:"right fas fa-angle-left"})]})]}),Object(d.jsxs)("ul",{className:"nav nav-treeview",children:[Object(d.jsx)("li",{className:"nav-item",children:Object(d.jsxs)("a",{className:"nav-link",onClick:function(){return c("/profile")},children:[Object(d.jsx)("i",{className:"fas fa-edit nav-icon"}),Object(d.jsx)("p",{style:e,children:"Profile Setting"})]})}),Object(d.jsx)("li",{className:"nav-item",children:Object(d.jsxs)("a",{className:"nav-link",onClick:function(){return c("/change_password")},children:[Object(d.jsx)("i",{className:"fas fa-key nav-icon"}),Object(d.jsx)("p",{style:e,children:"Change Password"})]})})]})]})]})})]})]})})},b=function(){var e=Object(o.n)();return Object(d.jsx)("div",{children:Object(d.jsxs)("nav",{className:"main-header navbar navbar-expand navbar-white navbar-light",children:[Object(d.jsx)("ul",{className:"navbar-nav",children:Object(d.jsx)("li",{className:"nav-item",children:Object(d.jsx)("a",{className:"nav-link","data-widget":"pushmenu",href:"#",children:Object(d.jsx)("i",{className:"fas fa-bars"})})})}),Object(d.jsx)("ul",{className:"navbar-nav ml-auto",children:Object(d.jsxs)("li",{className:"nav-item dropdown",children:[Object(d.jsx)("a",{className:"nav-link","data-toggle":"dropdown",href:"#",children:Object(d.jsx)("i",{className:"fa fa-user"})}),Object(d.jsxs)("div",{className:"dropdown-menu dropdown-menu-lg dropdown-menu-right",children:[Object(d.jsx)("div",{className:"dropdown-divider"}),Object(d.jsxs)("a",{href:"/profile",className:"dropdown-item",children:[Object(d.jsx)("i",{className:"fa fa-user mr-2"})," My Account"]}),Object(d.jsx)("div",{className:"dropdown-divider"}),Object(d.jsxs)("a",{href:"/change_password",className:"dropdown-item",children:[Object(d.jsx)("i",{className:"fa fa-user mr-2"})," Change Password"]}),Object(d.jsx)("div",{className:"dropdown-divider"}),Object(d.jsxs)("a",{className:"dropdown-item",onClick:function(s){return localStorage.removeItem("userToken"),void e("/login")},children:[Object(d.jsx)("i",{className:"fas fa-sign-out-alt"})," Logout"]})]})]})})]})})},h=(c(58),function(){return console.log(localStorage.getItem("userToken")),localStorage.getItem("userToken")?Object(d.jsx)(d.Fragment,{children:Object(d.jsxs)("div",{className:"wrapper",children:[Object(d.jsx)(b,{}),Object(d.jsx)(m,{}),Object(d.jsx)("div",{children:Object(d.jsx)(o.b,{})})]})}):Object(d.jsx)(o.a,{to:"/login"})}),O=c(18),x=c.n(O),u=function(){var e=Object(o.n)(),s=Object(n.useState)(""),c=Object(t.a)(s,2),a=c[0],i=c[1],r=Object(n.useState)(""),j=Object(t.a)(r,2),m=j[0],b=j[1];return Object(d.jsx)("div",{className:"".concat(x.a.wrapper," ").concat(x.a.first),children:Object(d.jsxs)("div",{id:x.a.formContent,children:[Object(d.jsxs)("div",{className:"".concat(x.a.fadeIn," ").concat(x.a.first),children:[Object(d.jsx)("h3",{className:"mt-4",children:Object(d.jsx)("b",{children:"OnePantry"})}),Object(d.jsx)("h6",{style:{color:"grey"},children:"Sign in to start your session"})]}),Object(d.jsx)("div",{id:"login",children:Object(d.jsx)("div",{className:"container",children:Object(d.jsx)("div",{id:"login-row",className:"row justify-content-center align-items-center",children:Object(d.jsx)("div",{id:"login-column",className:"col-md-10",children:Object(d.jsx)("div",{id:"login-box",className:"col-md-12",children:Object(d.jsxs)("form",{id:"login-form",className:"form",action:"",method:"post",children:[Object(d.jsx)("div",{className:"form-group mt-4",children:Object(d.jsx)("input",{type:"text",name:"username",id:"username",className:"form-control",placeholder:"Username",onChange:function(e){return function(e){i(e.target.value)}(e)}})}),Object(d.jsx)("div",{className:"form-group",children:Object(d.jsx)("input",{type:"text",name:"password",id:"password",className:"form-control",placeholder:"Password",onChange:function(e){return function(e){b(e.target.value)}(e)}})}),Object(d.jsxs)("div",{className:"form-group",children:[Object(d.jsxs)("div",{className:"row",children:[Object(d.jsxs)("div",{className:"col-md-6",children:[Object(d.jsx)("span",{children:Object(d.jsx)("input",{id:"remember-me",name:"remember-me",type:"checkbox"})}),"\xa0",Object(d.jsx)("span",{children:Object(d.jsx)("b",{children:"Remember me"})})]}),Object(d.jsx)("div",{className:"col-md-6",children:Object(d.jsx)("button",{className:"btn btn-info btn-md",style:{backgroundColor:"#2675ff",border:"#2675ff"},onClick:function(s){return function(s){s.preventDefault(),console.log(s),l.a.post("http://54.201.160.69:3282/api/v1/admin/signIn",{email:a,password:m}).then((function(s){console.log(s),1==s.data.status&&(localStorage.setItem("userToken",s.data.data.token),e("/"))})).catch((function(e){}))}(s)},children:"Sign In"})})]}),Object(d.jsxs)("div",{className:"row",children:[Object(d.jsx)("div",{className:"col-md-6",children:Object(d.jsx)("a",{href:"#",style:{color:"#2675ff",fontSize:"15px"},children:"Forgot Password?"})}),Object(d.jsx)("div",{className:"col-md-6"})]})]})]})})})})})}),Object(d.jsx)("div",{id:x.a.formFooter,children:Object(d.jsx)("a",{className:x.a.underlineHover,href:"#",children:"Sign Up?"})})]})})},f=function(){var e=Object(n.useState)(""),s=Object(t.a)(e,2),c=s[0],a=s[1],i=Object(n.useState)(""),r=Object(t.a)(i,2),j=r[0],o=r[1],m=localStorage.getItem("userToken");Object(n.useEffect)((function(){b()}),[]);var b=function(){l.a.get("http://54.201.160.69:3282/api/v1/admin/userdetail",{headers:{Authorization:m},user_token:m}).then((function(e){a(e.data.data.userName),o(e.data.data.phoneNumber)})).catch((function(e){}))};return Object(d.jsxs)(d.Fragment,{children:[console.log("userName",c),Object(d.jsx)("div",{className:"content-wrapper",children:Object(d.jsx)("div",{className:"content-header",children:Object(d.jsxs)("div",{className:"container-fluid",children:[Object(d.jsx)("section",{children:Object(d.jsx)("div",{className:"container-fluid",children:Object(d.jsxs)("div",{className:"row mb-2",children:[Object(d.jsx)("div",{className:"col-sm-6",children:Object(d.jsx)("h1",{children:"Profile Setting"})}),Object(d.jsx)("div",{className:"col-sm-6",children:Object(d.jsxs)("ol",{className:"breadcrumb float-sm-right",children:[Object(d.jsx)("li",{className:"breadcrumb-item",children:Object(d.jsx)("a",{href:"#",children:"Home"})}),Object(d.jsx)("li",{className:"breadcrumb-item active",children:"User Profile"})]})})]})})}),Object(d.jsx)("section",{className:"content mt-5",children:Object(d.jsx)("div",{className:"container-fluid",children:Object(d.jsxs)("div",{className:"row",children:[Object(d.jsx)("div",{className:"col-md-3",children:Object(d.jsx)("div",{className:"card card-primary card-outline",children:Object(d.jsxs)("div",{className:"card-body box-profile",children:[Object(d.jsx)("div",{className:"text-center",children:Object(d.jsx)("img",{className:"profile-user-img img-fluid img-circle",src:"http://54.201.160.69:3282/public/assets/user_media/1675321895612--user.jpg",alt:"User profile picture"})}),Object(d.jsx)("h3",{className:"profile-username text-center",children:"Admin"}),Object(d.jsx)("a",{href:"#",className:"btn btn-primary btn-block",children:Object(d.jsx)("b",{children:"Upload image"})})]})})}),Object(d.jsx)("div",{className:"col-md-9",children:Object(d.jsx)("div",{className:"card",children:Object(d.jsx)("div",{className:"card-body",children:Object(d.jsx)("div",{className:"tab-content",children:Object(d.jsx)("div",{className:"active tab-pane",id:"settings",children:Object(d.jsxs)("form",{className:"form-horizontal",children:[Object(d.jsxs)("div",{className:"form-group row",children:[Object(d.jsx)("label",{htmlFor:"inputName",className:"col-sm-3 col-form-label",children:"Username"}),Object(d.jsx)("div",{className:"col-sm-9",children:Object(d.jsx)("input",{type:"email",className:"form-control",id:"inputName",placeholder:"Username",value:c,onChange:function(e){return a(e.target.value)}})})]}),Object(d.jsxs)("div",{className:"form-group row",children:[Object(d.jsx)("label",{htmlFor:"inputNumber",className:"col-sm-3 col-form-label",children:"Phone Number"}),Object(d.jsx)("div",{className:"col-sm-9",children:Object(d.jsx)("input",{type:"number",className:"form-control",id:"inputNumber",placeholder:"Phone Number",value:j,onChange:function(e){return o(e.target.value)}})})]}),Object(d.jsx)("div",{className:"form-group row mt-4",children:Object(d.jsx)("div",{className:"offset-sm-10 col-sm-2",children:Object(d.jsx)("button",{type:"submit",className:"btn btn-block btn-danger",style:{backgroundColor:"#2675ff",border:"#2675ff"},children:"Submit"})})})]})})})})})})]})})})]})})})]})},N=(c(60),function(){var e=Object(n.useState)(""),s=Object(t.a)(e,2),c=s[0],a=s[1],i=Object(n.useState)(""),r=Object(t.a)(i,2),j=r[0],o=r[1],m=Object(n.useState)(""),b=Object(t.a)(m,2),h=(b[0],b[1]),O=localStorage.getItem("userToken");return Object(d.jsx)(d.Fragment,{children:Object(d.jsx)("div",{className:"content-wrapper",children:Object(d.jsx)("div",{className:"content-header",children:Object(d.jsxs)("div",{className:"container-fluid",children:[Object(d.jsx)("section",{children:Object(d.jsx)("div",{className:"container-fluid",children:Object(d.jsxs)("div",{className:"row mb-2",children:[Object(d.jsx)("div",{className:"col-sm-6",children:Object(d.jsx)("h1",{children:"Change Password"})}),Object(d.jsx)("div",{className:"col-sm-6",children:Object(d.jsxs)("ol",{className:"breadcrumb float-sm-right",children:[Object(d.jsx)("li",{className:"breadcrumb-item",children:Object(d.jsx)("a",{href:"#",children:"Home"})}),Object(d.jsx)("li",{className:"breadcrumb-item active",children:"Change Password"})]})})]})})}),Object(d.jsx)("section",{className:"content mt-5",children:Object(d.jsx)("div",{className:"container-fluid",children:Object(d.jsx)("div",{className:"row",children:Object(d.jsx)("div",{className:"col-md-12",children:Object(d.jsx)("div",{className:"card",children:Object(d.jsx)("div",{className:"card-body",children:Object(d.jsx)("div",{className:"tab-content",children:Object(d.jsx)("div",{className:"active tab-pane",id:"settings",children:Object(d.jsxs)("form",{className:"form-horizontal",children:[Object(d.jsxs)("div",{className:"form-group row",children:[Object(d.jsx)("label",{htmlFor:"inputNewPassword",className:"col-sm-2 col-form-label",children:"Old Password"}),Object(d.jsx)("div",{className:"col-sm-4",children:Object(d.jsx)("input",{style:{"text-align":"left"},type:"password",className:"form-control",id:"inputOldPassword",placeholder:"Old Password",onChange:function(e){return a(e.target.value)}})})]}),Object(d.jsxs)("div",{className:"form-group row",children:[Object(d.jsx)("label",{htmlFor:"inputNewPassword",className:"col-sm-2 col-form-label",children:"New Password"}),Object(d.jsx)("div",{className:"col-sm-4",children:Object(d.jsx)("input",{style:{"text-align":"left"},type:"password",className:"form-control",id:"inputNewPassword",placeholder:"New Password",onChange:function(e){return o(e.target.value)}})})]}),Object(d.jsxs)("div",{className:"form-group row",children:[Object(d.jsx)("label",{htmlFor:"inputConfirmPassword",className:"col-sm-2 col-form-label",children:"Confirm Password"}),Object(d.jsx)("div",{className:"col-sm-4",children:Object(d.jsx)("input",{style:{"text-align":"left"},type:"password",className:"form-control",id:"inputConfirmPassword",placeholder:"Confirm Password",onChange:function(e){return h(e.target.value)}})})]}),Object(d.jsx)("div",{className:"form-group row mt-4",children:Object(d.jsx)("div",{className:"mt-4 col-sm-3",children:Object(d.jsx)("button",{onClick:function(){return function(){var e={headers:{Authorization:O}};l.a.post("http://54.201.160.69:3282/api/v1/admin/changepassword",{password:j,old_password:c},e).then((function(e){alert("Success")})).catch((function(e){alert("Failure")}))}()},type:"button",className:"btn btn-block btn-danger",style:{backgroundColor:"#2675ff",border:"#2675ff"},children:"Change Password"})})})]})})})})})})})})})]})})})})}),v=Object(a.a)([{path:"/",exact:!0,element:Object(d.jsx)(h,{}),children:[{path:"dashboard",exact:!0,element:Object(d.jsx)(j,{})},{path:"/",exact:!0,element:Object(d.jsx)(j,{})},{path:"/profile",exact:!0,element:Object(d.jsx)(f,{})},{path:"/change_password",exact:!0,element:Object(d.jsx)(N,{})}]},{path:"/login",exact:!0,element:Object(d.jsx)(u,{})}])},48:function(e,s,c){},61:function(e,s,c){"use strict";c.r(s);var a=c(1),t=c.n(a),n=c(39),l=c.n(n),i=(c(48),c(40)),r=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,65)).then((function(s){var c=s.getCLS,a=s.getFID,t=s.getFCP,n=s.getLCP,l=s.getTTFB;c(e),a(e),t(e),n(e),l(e)}))},d=c(64),j=c(0);l.a.render(Object(j.jsx)(t.a.StrictMode,{children:Object(j.jsx)(d.a,{children:Object(j.jsx)(i.a,{})})}),document.getElementById("root")),r()}},[[61,1,2]]]);
//# sourceMappingURL=main.3a6b98ba.chunk.js.map