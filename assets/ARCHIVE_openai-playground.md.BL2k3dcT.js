import{a as p}from"./chunks/theme.C7afYg9x.js";import{_,v as l,o as n,c as o,a as e,b as h,t as v,F as m,g as f,w as g,a6 as C,I}from"./chunks/framework.kgRCixSj.js";const y="https://api.ceil.top:8000",A=p.create({baseURL:y}),r=`Human:你叫什么名字？
AI:`,x=async s=>{const t=await A({method:"post",url:"/chat",data:{words:s}});return t&&t.data?`${s}${t.data}

Human:`:s},P={class:"wrapper"},b=["value"],k={key:0,class:"loading spin"},H={class:"toolbar"},V={class:"letters"},E={__name:"OpenAI",setup(s){const a=l(r),t=l(!1),u=async()=>{t.value=!0,a.value=await x(a.value),t.value=!1},i=({target:c})=>a.value=c.value,d=()=>a.value=r;return(c,T)=>(n(),o(m,null,[e("div",P,[e("textarea",{value:a.value,onInput:i,placeholder:"基于 ChatGPT API 的聊天程序"},null,40,b),t.value?(n(),o("div",k)):h("",!0)]),e("div",H,[e("span",V,v(a.value.length||0),1),e("button",{onClick:u,class:"send"},"Send"),e("button",{onClick:d},"Reset")])],64))}},R=_(E,[["__scopeId","data-v-5cc12f59"]]),O=JSON.parse('{"title":"ChatGPT Playground","description":"","frontmatter":{"title":"ChatGPT Playground","layout":"doc","tags":"AI|前端|后端"},"headers":[],"relativePath":"ARCHIVE/openai-playground.md","filePath":"ARCHIVE/openai-playground.md","lastUpdated":1734231174000}'),S={name:"ARCHIVE/openai-playground.md"},w=Object.assign(S,{setup(s){return(a,t)=>(n(),o("div",null,[(n(),f(C,null,{default:g(()=>[I(R)]),_:1}))]))}});export{O as __pageData,w as default};