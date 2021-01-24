import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import "./index.css";
import HeaderComponent from "./components/HeaderComponent";
import { INDEX_PATH } from "./constants/RouterConstants";
import HomeContainer from "./components/HomeContainer";
import NotFound from "./components/NotFound";

const { Content, Footer } = Layout;

ReactDOM.render(
  <BrowserRouter>
    <Layout className={"layout-container"}>
      <Route component={HeaderComponent} />
      <Content className={"content-container"}>
        <Switch>
          <Route exact path={INDEX_PATH} component={HomeContainer} />
          <Route component={NotFound} />
        </Switch>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Fast Typer ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  </BrowserRouter>,
  document.getElementById("root")
);
