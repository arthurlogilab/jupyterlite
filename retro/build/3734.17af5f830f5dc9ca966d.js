(self.webpackChunk_JUPYTERLAB_CORE_OUTPUT=self.webpackChunk_JUPYTERLAB_CORE_OUTPUT||[]).push([[3734],{93734:(t,e,s)=>{"use strict";s.r(e),s.d(e,{OutputArea:()=>O,OutputAreaModel:()=>h,OutputPrompt:()=>C,SimplifiedOutputArea:()=>f,Stdin:()=>w});var i,n=s(79028),r=s(58137),a=s(70317),u=s(15523),o=s(31608),d=s(66065);class h{constructor(t={}){this.clearNext=!1,this._trusted=!1,this._isDisposed=!1,this._stateChanged=new r.Signal(this),this._changed=new r.Signal(this),this._trusted=!!t.trusted,this.contentFactory=t.contentFactory||h.defaultContentFactory,this.list=new u.ObservableList,t.values&&(0,n.each)(t.values,(t=>{this._add(t)})),this.list.changed.connect(this._onListChanged,this)}get stateChanged(){return this._stateChanged}get changed(){return this._changed}get length(){return this.list?this.list.length:0}get trusted(){return this._trusted}set trusted(t){if(t===this._trusted)return;const e=this._trusted=t;for(let t=0;t<this.list.length;t++){let s=this.list.get(t);const i=s.toJSON();s.dispose(),s=this._createItem({value:i,trusted:e}),this.list.set(t,s)}}get isDisposed(){return this._isDisposed}dispose(){this.isDisposed||(this._isDisposed=!0,this.list.dispose(),r.Signal.clearData(this))}get(t){return this.list.get(t)}set(t,e){e=d.JSONExt.deepCopy(e),i.normalize(e);const s=this._createItem({value:e,trusted:this._trusted});this.list.set(t,s)}add(t){return this.clearNext&&(this.clear(),this.clearNext=!1),this._add(t)}clear(t=!1){this._lastStream="",t?this.clearNext=!0:((0,n.each)(this.list,(t=>{t.dispose()})),this.list.clear())}fromJSON(t){this.clear(),(0,n.each)(t,(t=>{this._add(t)}))}toJSON(){return(0,n.toArray)((0,n.map)(this.list,(t=>t.toJSON())))}_add(t){const e=this._trusted;if(t=d.JSONExt.deepCopy(t),i.normalize(t),a.isStream(t)&&this._lastStream&&t.name===this._lastName&&this.shouldCombine({value:t,lastModel:this.list.get(this.length-1)})){this._lastStream+=t.text,this._lastStream=i.removeOverwrittenChars(this._lastStream),t.text=this._lastStream;const s=this._createItem({value:t,trusted:e}),n=this.length-1;return this.list.get(n).dispose(),this.list.set(n,s),n}a.isStream(t)&&(t.text=i.removeOverwrittenChars(t.text));const s=this._createItem({value:t,trusted:e});return a.isStream(t)?(this._lastStream=t.text,this._lastName=t.name):this._lastStream="",this.list.push(s)}shouldCombine(t){return!0}_createItem(t){const e=this.contentFactory.createOutputModel(t);return e.changed.connect(this._onGenericChange,this),e}_onListChanged(t,e){this._changed.emit(e)}_onGenericChange(){this._stateChanged.emit(void 0)}}!function(t){class e{createOutputModel(t){return new o.OutputModel(t)}}t.ContentFactory=e,t.defaultContentFactory=new e}(h||(h={})),function(t){t.normalize=function(t){a.isStream(t)&&Array.isArray(t.text)&&(t.text=t.text.join("\n"))},t.removeOverwrittenChars=function(t){return function(t){for(t=t.replace(/\r+\n/gm,"\n");t.search(/\r[^$]/g)>-1;){const e=t.match(/^(.*)\r+/m)[1];let s=t.match(/\r+(.*)$/m)[1];s+=e.slice(s.length,e.length),t=t.replace(/\r+.*$/m,"\r").replace(/^.*\r/m,s)}return t}(function(t){let e=t;do{e=(t=e).replace(/[^\n]\x08/gm,"")}while(e.length<t.length);return t}(t))}}(i||(i={}));var l=s(97209),p=s(20337),c=s(77031),m=s(992);const g="jp-OutputArea-child",_="jp-OutputArea-output",y="jp-OutputArea-prompt";class O extends c.Widget{constructor(t){super(),this.outputLengthChanged=new r.Signal(this),this._onIOPub=t=>{const e=this.model,s=t.header.msg_type;let i;const n=(t.content.transient||{}).display_id;let r;switch(s){case"execute_result":case"display_data":case"stream":case"error":i=Object.assign(Object.assign({},t.content),{output_type:s}),e.add(i);break;case"clear_output":{const s=t.content.wait;e.clear(s);break}case"update_display_data":if(i=Object.assign(Object.assign({},t.content),{output_type:"display_data"}),r=this._displayIdMap.get(n),r)for(const t of r)e.set(t,i)}n&&"display_data"===s&&(r=this._displayIdMap.get(n)||[],r.push(e.length-1),this._displayIdMap.set(n,r))},this._onExecuteReply=t=>{const e=this.model,s=t.content;if("ok"!==s.status)return;const i=s&&s.payload;if(!i||!i.length)return;const n=i.filter((t=>"page"===t.source));if(!n.length)return;const r={output_type:"display_data",data:JSON.parse(JSON.stringify(n[0])).data,metadata:{}};e.add(r)},this._minHeightTimeout=null,this._displayIdMap=new Map;const e=this.model=t.model;this.addClass("jp-OutputArea"),this.rendermime=t.rendermime,this.contentFactory=t.contentFactory||O.defaultContentFactory,this.layout=new c.PanelLayout,this.trimmedOutputModels=new Array,this.maxNumberOutputs=t.maxNumberOutputs||0,this.headTailNumberOutputs=Math.round(this.maxNumberOutputs/2),this.headEndIndex=this.headTailNumberOutputs;for(let t=0;t<e.length;t++){const s=e.get(t);this._insertOutput(t,s)}e.changed.connect(this.onModelChanged,this),e.stateChanged.connect(this.onStateChanged,this)}get widgets(){return this.layout.widgets}get future(){return this._future}set future(t){if(this.model.isDisposed)throw Error("Model is disposed");this._future!==t&&(this._future&&this._future.dispose(),this._future=t,this.model.clear(),this.widgets.length&&(this._clear(),this.outputLengthChanged.emit(this.model.length)),t.onIOPub=this._onIOPub,t.onReply=this._onExecuteReply,t.onStdin=e=>{m.KernelMessage.isInputRequestMsg(e)&&this.onInputRequest(e,t)})}dispose(){this._future&&(this._future.dispose(),this._future=null),this._displayIdMap.clear(),super.dispose()}onModelChanged(t,e){switch(e.type){case"add":this._insertOutput(e.newIndex,e.newValues[0]),this.outputLengthChanged.emit(this.model.length);break;case"remove":if(this.widgets.length){if(0===this.model.length)this._clear();else{const t=e.oldIndex;for(let s=0;s<e.oldValues.length&&t<this.widgets.length;++s){const e=this.widgets[t];e.parent=null,e.dispose()}this._moveDisplayIdIndices(t,e.oldValues.length),this._preventHeightChangeJitter()}this.outputLengthChanged.emit(this.model.length)}break;case"set":this._setOutput(e.newIndex,e.newValues[0]),this.outputLengthChanged.emit(this.model.length)}}_moveDisplayIdIndices(t,e){this._displayIdMap.forEach((s=>{const i=t+e;for(let n=s.length-1;n>=0;--n){const r=s[n];r>=t&&r<i?s.splice(n,1):r>=i&&(s[n]-=e)}}))}onStateChanged(t){this.trimmedOutputModels=new Array;for(let t=0;t<this.model.length;t++)this._setOutput(t,this.model.get(t));this.outputLengthChanged.emit(this.model.length)}_clear(){if(!this.widgets.length)return;const t=this.widgets.length;for(let e=0;e<t;e++){const t=this.widgets[0];t.parent=null,t.dispose()}this._displayIdMap.clear(),this._preventHeightChangeJitter()}_preventHeightChangeJitter(){const t=this.node.getBoundingClientRect();this.node.style.minHeight=`${t.height}px`,this._minHeightTimeout&&window.clearTimeout(this._minHeightTimeout),this._minHeightTimeout=window.setTimeout((()=>{this.isDisposed||(this.node.style.minHeight="")}),50)}onInputRequest(t,e){const s=this.contentFactory,i=t.content.prompt,n=t.content.password,r=new c.Panel;r.addClass(g),r.addClass("jp-OutputArea-stdin-item");const a=s.createOutputPrompt();a.addClass(y),r.addWidget(a);const u=s.createStdin({prompt:i,password:n,future:e});u.addClass(_),r.addWidget(u),this.layout.addWidget(r),u.value.then((t=>{this.model.add({output_type:"stream",name:"stdin",text:t+"\n"}),r.dispose()}))}_setOutput(t,e){const s=this.layout,i=s.widgets[t],n=i.widgets?i.widgets[1]:i,r=this.rendermime.preferredMimeType(e.data,e.trusted?"any":"ensure");n.renderModel&&x.currentPreferredMimetype.get(n)===r&&O.isIsolated(r,e.metadata)===n instanceof x.IsolatedRenderer?n.renderModel(e):(s.widgets[t].dispose(),this._insertOutput(t,e))}_insertOutput(t,e){if(0===t&&(this.trimmedOutputModels=new Array),t===this.maxNumberOutputs&&0!==this.maxNumberOutputs){const t=this.model.contentFactory.createOutputModel({value:{output_type:"display_data",data:{"text/html":`\n              <a style="margin: 10px; text-decoration: none;">\n                <pre>Output of this cell has been trimmed on the initial display.</pre>\n                <pre>Displaying the first ${this.maxNumberOutputs} top and last bottom outputs.</pre>\n                <pre>Click on this message to get the complete output.</pre>\n              </a>\n              `}}}),e=()=>this._showTrimmedOutputs(this.headTailNumberOutputs),s=this.createOutputItem(t);s.node.addEventListener("click",e),this.layout.insertWidget(this.headEndIndex,s)}const s=this._createOutput(e),i=this.layout;t<this.maxNumberOutputs||0===this.maxNumberOutputs?i.insertWidget(t,s):t>=this.maxNumberOutputs&&(i.removeWidgetAt(this.headTailNumberOutputs+1),i.insertWidget(t,s)),t>=this.headTailNumberOutputs&&0!==this.maxNumberOutputs&&this.trimmedOutputModels.push(e)}_createOutput(t){let e=this.createOutputItem(t);return e?e.toggleClass("jp-OutputArea-executeResult",null!==t.executionCount):e=new c.Widget,e}_showTrimmedOutputs(t){const e=this.layout;e.removeWidgetAt(t);for(let s=0;s<this.trimmedOutputModels.length-this.headTailNumberOutputs;s++){const i=this._createOutput(this.trimmedOutputModels[s]);e.insertWidget(t+s,i)}}createOutputItem(t){const e=this.createRenderedMimetype(t);if(!e)return null;const s=new c.Panel;s.addClass(g);const i=this.contentFactory.createOutputPrompt();return i.executionCount=t.executionCount,i.addClass(y),s.addWidget(i),e.addClass(_),s.addWidget(e),s}createRenderedMimetype(t){const e=this.rendermime.preferredMimeType(t.data,t.trusted?"any":"ensure");if(!e)return null;let s=this.rendermime.createRenderer(e);return!0===O.isIsolated(e,t.metadata)&&(s=new x.IsolatedRenderer(s)),x.currentPreferredMimetype.set(s,e),s.renderModel(t).catch((t=>{const e=document.createElement("pre");e.textContent=`Javascript Error: ${t.message}`,s.node.appendChild(e),s.node.className="lm-Widget jp-RenderedText",s.node.setAttribute("data-mime-type","application/vnd.jupyter.stderr")})),s}}class f extends O{onInputRequest(t,e){}createOutputItem(t){const e=this.createRenderedMimetype(t);return e&&e.addClass(_),e}}!function(t){t.execute=async function(t,e,s,i){var n;let r=!0;i&&Array.isArray(i.tags)&&-1!==i.tags.indexOf("raises-exception")&&(r=!1);const a={code:t,stop_on_error:r},u=null===(n=s.session)||void 0===n?void 0:n.kernel;if(!u)throw new Error("Session has no kernel.");const o=u.requestExecute(a,!1,i);return e.future=o,o.done},t.isIsolated=function(t,e){const s=e[t];return s&&void 0!==s.isolated?!!s.isolated:!!e.isolated};class e{createOutputPrompt(){return new C}createStdin(t){return new w(t)}}t.ContentFactory=e,t.defaultContentFactory=new e}(O||(O={}));class C extends c.Widget{constructor(){super(),this._executionCount=null,this.addClass("jp-OutputPrompt")}get executionCount(){return this._executionCount}set executionCount(t){this._executionCount=t,this.node.textContent=null===t?"":`[${t}]:`}}class w extends c.Widget{constructor(t){super({node:x.createInputWidgetNode(t.prompt,t.password)}),this._promise=new d.PromiseDelegate,this.addClass("jp-Stdin"),this._input=this.node.getElementsByTagName("input")[0],this._input.focus(),this._future=t.future,this._value=t.prompt+" "}get value(){return this._promise.promise.then((()=>this._value))}handleEvent(t){const e=this._input;"keydown"===t.type&&13===t.keyCode&&(this._future.sendInputReply({status:"ok",value:e.value}),"password"===e.type?this._value+=Array(e.value.length+1).join("·"):this._value+=e.value,this._promise.resolve(void 0))}onAfterAttach(t){this._input.addEventListener("keydown",this),this.update()}onUpdateRequest(t){this._input.focus()}onBeforeDetach(t){this._input.removeEventListener("keydown",this)}}var x;!function(t){t.createInputWidgetNode=function(t,e){const s=document.createElement("div"),i=document.createElement("pre");i.className="jp-Stdin-prompt",i.textContent=t;const n=document.createElement("input");return n.className="jp-Stdin-input",e&&(n.type="password"),s.appendChild(i),i.appendChild(n),s};class e extends c.Widget{constructor(t){super({node:document.createElement("iframe")}),this.addClass("jp-mod-isolated"),this._wrapped=t;const e=this.node;e.frameBorder="0",e.scrolling="auto",e.addEventListener("load",(()=>{e.contentDocument.open(),e.contentDocument.write(this._wrapped.node.innerHTML),e.contentDocument.close();const t=e.contentDocument.body;e.style.height=`${t.scrollHeight}px`,e.heightChangeObserver=new l.Z((()=>{e.style.height=`${t.scrollHeight}px`})),e.heightChangeObserver.observe(t)}))}renderModel(t){return this._wrapped.renderModel(t)}}t.IsolatedRenderer=e,t.currentPreferredMimetype=new p.AttachedProperty({name:"preferredMimetype",create:t=>""})}(x||(x={}))}}]);
//# sourceMappingURL=3734.17af5f830f5dc9ca966d.js.map