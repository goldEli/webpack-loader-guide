import React from 'react'
import ReactDom from 'react-dom'
import SON from "./SON"
import i18n from "../i18n/index"
import Component1 from "./Component1"
import I18nIgnoreComponent from "./I18nIgnoreComponent"

// Default language is English

window.i18n = i18n['en']

const data = ["苹果","香蕉","葡萄"]
const title = "i18n测试"
function App() {
  return (
    <React.Fragment>
      <h1>{title}</h1>
      <h3>{"列表"}</h3>
      {data.map(item => <p>{item}</p>)}
      <SON/>
      <Component1/>
      <I18nIgnoreComponent/>
    </React.Fragment>
  )
}

ReactDom.render(<App/>, document.getElementById('root'))