(this.webpackJsonpdesign_page=this.webpackJsonpdesign_page||[]).push([[0],{222:function(e,t,n){},223:function(e,t,n){},392:function(e,t,n){"use strict";n.r(t);var o=n(0),a=n.n(o),s=n(28),i=n.n(s),c=(n(222),n(59)),r=n(12),l=n(16),d=n(19),u=n(18),h=(n(223),n(200)),b=n.n(h),p=n(208),g=n.n(p),f=n(209),j=n.n(f),O=n(211),k=n(29),v=n(198),_=n(81),m=n(212),w=n.n(m),S=(n(192),n(196),n(20)),x=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(e){var o;return Object(r.a)(this,n),(o=t.call(this,e)).store=e.store,o}return Object(l.a)(n,[{key:"render",value:function(){var e=this;return Object(S.jsxs)(v.Z,{children:[Object(S.jsxs)(v.Z.Group,{align:_.a.LEFT,children:[Object(S.jsx)(v.b,{icon:"new-object",minimal:!0,href:"/create/design/",children:"New"}),Object(S.jsx)(v.R,{leftIcon:"tag",id:"name_input",placeholder:"Design Name"}),Object(S.jsx)(v.g,{icon:"floppy-disk",minimal:!0,onClick:function(){e.props.clickSave()},children:"Save"}),Object(S.jsx)("span",{className:"feedback-tag bp3-tag bp3-intent-"+this.props.feedbackIntent+(this.props.feedbackHidden?" hidden":""),children:this.props.feedback})]}),Object(S.jsxs)(v.Z.Group,{align:_.a.RIGHT,children:[this.props.showAIOButton&&Object(S.jsx)(v.g,{minimal:!0,icon:"cloud-upload",onClick:this.props.showWebhookDialogClick,children:"Setup Adafruit.io Webhooks"}),Object(S.jsx)(v.b,{minimal:!0,href:"/list/designs/",icon:"layout-grid",children:"My Designs"}),Object(S.jsx)(v.b,{minimal:!0,href:"/docs/",target:"_blank",icon:Object(S.jsx)(w.a,{className:"bp3-icon",style:{fontSize:"20px"}}),children:"Help"}),Object(S.jsx)(v.t,{})]})]})}}]),n}(a.a.Component),y=n(87),D=n.n(y),C=n(147),T=n(112),I=n(80),N=n(71),J=n(82),P=Object(k.observer)((function(e){var t=e.store,n=a.a.useState([]),o=Object(T.a)(n,2),s=o[0],i=o[1];function c(){return r.apply(this,arguments)}function r(){return(r=Object(C.a)(D.a.mark((function e(){var t,n,o;return D.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(t=["adabot","billie","blinka","cappy","connie","gus","hans","mho","minerva","ruby","sparky"],n=[],o=0;o<t.length;o++)n.push({url:"/static/img/adafruit_".concat(t[o],"_emoji.png")});i(n);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return a.a.useEffect((function(){c()}),[]),Object(S.jsxs)("div",{style:{height:"100%",display:"flex",flexDirection:"column"},children:[Object(S.jsx)(v.R,{leftIcon:"search",placeholder:"Search...",onChange:function(e){c()},style:{marginBottom:"20px"}}),Object(S.jsx)("p",{children:"Demo images: "}),Object(S.jsx)(N.ImagesGrid,{images:s,getPreview:function(e){return e.url},onSelect:function(){var e=Object(C.a)(D.a.mark((function e(n,o){var a,s,i;return D.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(I.getImageSize)(n.url);case 2:a=e.sent,s=a.width,i=a.height,t.activePage.addElement({type:"image",src:n.url,width:s,height:i,x:(null===o||void 0===o?void 0:o.x)||0,y:(null===o||void 0===o?void 0:o.y)||0});case 6:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),rowsNumber:2,isLoading:!s.length,loadMore:!1})]})})),H=n(2),E=n(58),A=n(31),R=n.n(A),F=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(e){var o;return Object(r.a)(this,n),(o=t.call(this,e)).handleOpen=function(){return o.setState({isOpen:!0})},o.handleClose=function(){o.setState({isOpen:!1}),o.props.handleClose()},o.state={isOpen:o.props.isOpen,autoFocus:!0,canEscapeKeyClose:!0,canOutsideClickClose:!0,enforceFocus:!0,usePortal:!0},o}return Object(l.a)(n,[{key:"render",value:function(){var e=this;return console.log("url : "+this.props.preview_webhook_url),setTimeout((function(){R()("#preview_webhook_input").val(e.props.preview_webhook_url),R()("#signature_webhook_input").val(e.props.signature_webhook_url)}),200),Object(S.jsxs)(v.r,Object(c.a)(Object(c.a)({className:"",icon:"cloud-upload",onClose:this.handleClose,title:"Adafruit.io Webhook URLs"},this.state),{},{children:[Object(S.jsxs)("div",{className:H.g.DIALOG_BODY,children:[Object(S.jsx)("p",{children:"Image Preview Feed"}),Object(S.jsx)(v.R,{id:"preview_webhook_input"}),Object(S.jsx)("br",{}),Object(S.jsx)("p",{children:"Image Signature Feed"}),Object(S.jsx)(v.R,{id:"signature_webhook_input"})]}),Object(S.jsx)("div",{className:H.g.DIALOG_FOOTER,children:Object(S.jsxs)("div",{className:H.g.DIALOG_FOOTER_ACTIONS,children:[Object(S.jsx)(v.g,{onClick:this.handleClose,children:"Close"}),Object(S.jsx)(v.g,{intent:E.a.SUCCESS,onClick:function(){e.props.saveWebhooksClick(),e.handleClose()},children:"Save"})]})})]}))}}]),n}(a.a.Component);F.getDerivedStateFromProps=function(e,t){return console.log("updating state from props"),{isOpen:e.isOpen}};var L=F,U=n(75),W=n(143),G=n.n(W),B=n(26),z=n(148),M=n.n(z),q=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(e){var o;return Object(r.a)(this,n),(o=t.call(this,e)).refHandlers={toaster:function(e){return o.toaster=e}},o.render=function(){return console.log("input data inside render"),console.log(o.input_data),Object(S.jsxs)(a.a.Fragment,{children:[Object(S.jsx)(v.Hb,{position:B.a.TOP,ref:o.refHandlers.toaster,intent:E.a.DANGER}),Object(S.jsx)(L,{isOpen:o.state.webhookDialogOpen,saveWebhooksClick:o.saveWebhooksClick,handleClose:o.handleWebhooksDialogClose,preview_webhook_url:o.input_data?o.input_data.data.preview_webhook_url:"",signature_webhook_url:o.input_data?o.input_data.data.signature_webhook_url:""}),Object(S.jsx)(x,{store:o.store,clickSave:o.clickSave,clickSaveAIO:o.clickSaveAIO,feedbackHidden:o.state.feedbackHidden,feedbackIntent:o.state.feedbackIntent,feedback:o.state.feedback,codepyHidden:o.creating,showWebhookDialogClick:o.showWebhookDialog,uuid:o.creating?"":o.input_data.data.uuid,showAIOButton:!o.creating}),Object(S.jsxs)("div",{style:{display:"flex",height:"92vh",width:"100vw"},children:[Object(S.jsx)("div",{style:{width:"400px",height:"100%",display:"flex"},children:Object(S.jsx)(U.SidePanel,{store:o.store,sections:o.sections,defaultSection:"adafruit"})}),Object(S.jsxs)("div",{style:{display:"flex",height:"100%",margin:"auto",flex:1,flexDirection:"column",position:"relative"},children:[Object(S.jsx)(b.a,{store:o.store,downloadButtonEnabled:!0}),Object(S.jsx)(j.a,{store:o.store,pageControlsEnabled:!1}),Object(S.jsx)(g.a,{store:o.store})]})]})]})},o.saveWebhooksClick=function(){console.log("click save webhooks"),console.log(R()("#preview_webhook_input").val()),console.log(R()("#signature_webhook_input").val()),R.a.ajax({method:"POST",url:"/update/design/"+o.input_data.data.id+"/webhooks/",data:{preview_webhook:R()("#preview_webhook_input").val(),signature_webhook:R()("#signature_webhook_input").val()}}).done((function(e){o.input_data.data.preview_webhook_url=R()("#preview_webhook_input").val(),o.input_data.data.signature_webhook_url=R()("#signature_webhook_input").val(),console.log(e)}))},o.handleWebhooksDialogClose=function(){o.setState({webhookDialogOpen:!1})},o.showWebhookDialog=function(){console.log("showing webhook dialog"),o.setState({webhookDialogOpen:!0},(function(){console.log(o.state.webhookDialogOpen)}))},o.clickSave=function(){console.log("clicked save"),""!==R()("#name_input").val()?void 0!==o.input_data&&o.input_data.data.hasOwnProperty("id")?R.a.ajax({method:"POST",url:"/update/design/"+o.input_data.data.id+"/",data:{image_base64:o.store.toDataURL(),json:JSON.stringify(o.store.toJSON()),name:R()("#name_input").val()}}).done((function(e){o.setState({feedbackHidden:!1,feedbackIntent:"success",feedback:"Design saved successfully"}),console.log(e),setTimeout((function(){o.setState({feedbackHidden:!0})}),3e3)})):R.a.ajax({method:"POST",url:"/create_design/",data:{image_base64:o.store.toDataURL(),json:JSON.stringify(o.store.toJSON()),name:R()("#name_input").val()}}).done((function(e){o.setState({feedbackHidden:!1,feedbackIntent:"success",feedback:"Design created successfully",savedDesignJson:o.store.toJSON()}),setTimeout((function(){o.setState({feedbackHidden:!0}),window.location=e.view_design_url}),3e3),console.log(e)})).fail((function(e){o.setState({feedbackHidden:!1,feedbackIntent:"danger",feedback:e.responseJSON.error})})):(o.setState({feedbackHidden:!1,feedbackIntent:"danger",feedback:"Design Name cannot be blank"}),setTimeout((function(){o.setState({feedbackHidden:!0})}),3e3),console.log("please fill in name"))},o.clickSaveAIO=function(){console.log("clicked save"),void 0!==o.input_data&&o.input_data.data.hasOwnProperty("id")&&(console.log(o.store.toDataURL()),R.a.ajax({method:"POST",url:"/upload_aio/design/"+o.input_data.data.id+"/",data:{image_base64:o.store.toDataURL(),json:JSON.stringify(o.store.toJSON()),name:R()("#name_input").val()}}).done((function(e){o.setState({feedbackHidden:!1,feedbackIntent:"success",feedback:"Design saved successfully"}),console.log(e),setTimeout((function(){o.setState({feedbackHidden:!0})}),3e3)})))},console.log("starting the app..."),o.store=Object(O.createStore)({key:"urccVCzsiJVAkwUNpR_y"}),o.store.setSize(240,240),o.state={feedback:"Design Saved",feedbackIntent:"success",feedbackHidden:!0,webhookDialogOpen:!1,savedDesignJson:{}},o.creating=!0,o}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.input_data=R()("#root").data("props"),console.log("ajax setup"),R.a.ajaxSetup({beforeSend:function(t,n){var o;o=n.type,/^(GET|HEAD|OPTIONS|TRACE)$/.test(o)||e.crossDomain||(console.log("ajax setup"),t.setRequestHeader("X-CSRFToken",e.getCookie("csrftoken")))}}),console.log(this.input_data),void 0!==this.input_data&&this.input_data.data.hasOwnProperty("design_json")?(this.creating=!1,console.log(this.store.activePage),this.store.loadJSON(JSON.parse(this.input_data.data.design_json)),console.dir(this.store.pages),console.log(this.store.activePage.id),R()("#name_input").val(this.input_data.data.name),this.setState({savedDesignJson:this.store.toJSON()})):(this.creating=!0,this.store.addPage(),this.setState({savedDesignJson:this.store.toJSON()})),setTimeout((function(){e.store.setScale(1.5)}),300),setTimeout((function(){R()(".credit span a").attr("target","_blank")}),2e3),this.sections=U.DEFAULT_SECTIONS,console.log("sections: "),console.log(U.DEFAULT_SECTIONS);var t={name:"adafruit",Tab:function(e){return Object(S.jsx)(J.SectionTab,Object(c.a)(Object(c.a)({name:"Adafruit"},e),{},{children:Object(S.jsx)(G.a,{})}))},Panel:P};this.sections.splice(1,0,t),U.PhotosSection.Tab=function(e){return Object(S.jsx)(J.SectionTab,Object(c.a)(Object(c.a)({name:"Unsplash"},e),{},{children:Object(S.jsx)(v.P,{icon:"media"})}))},R()(window).on("beforeunload",(function(){if(console.log("state in beforeunload"),console.dir(e.state.savedDesignJson),console.log("----"),console.dir(e.store.toJSON()),console.log("json has changed ? "+!M.a.isEqual(e.state.savedDesignJson,e.store.toJSON())),console.log("history"),console.log(e.store.history.canUndo),!M.a.isEqual(e.state.savedDesignJson,e.store.toJSON()))return"Are you sure to leave? There is unsaved worked."})),this.forceUpdate()}},{key:"getCookie",value:function(e){var t=null;if(document.cookie&&""!=document.cookie)for(var n=document.cookie.split(";"),o=0;o<n.length;o++){var a=R.a.trim(n[o]);if(a.substring(0,e.length+1)==e+"="){t=decodeURIComponent(a.substring(e.length+1));break}}return t}}]),n}(a.a.Component),Z=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,399)).then((function(t){var n=t.getCLS,o=t.getFID,a=t.getFCP,s=t.getLCP,i=t.getTTFB;n(e),o(e),a(e),s(e),i(e)}))};i.a.render(Object(S.jsx)(a.a.StrictMode,{children:Object(S.jsx)(q,{})}),document.getElementById("root")),Z()}},[[392,1,2]]]);
//# sourceMappingURL=main.41406e30.chunk.js.map