import React, { useState, Props } from "react";
import { Input, Radio, List, Icon } from "antd";
import * as next from "next";
import Axios from "axios";
import { connect } from "react-redux";
import {
  GoldType,
  OrderType,
  Gold,
  MyCtx,
  GitHubPeriod,
  Language,
  GitHub,
  GitHubOrderType
} from "../type";
import {
  addGoldList,
  changeGoldList,
  changeGitHubList,
  addGitHubList
} from "../store/index";

import "./index.scss";
import { RadioChangeEvent } from "antd/lib/radio";
import { getDateString } from "../util/date";
import TypeSelect from "../components/type-select";

interface IndexProps extends Props<null> {
  leftList: Gold[];
  rightList: GitHub[];
  addGoldList: (list: Gold[]) => void;
  changeGoldList: (list: Gold[]) => void;
  changeGitHubList: (list: GitHub[]) => void;
  addGitHubList: (list: GitHub[]) => void;
}

const Home: next.NextPage = (props: IndexProps) => {
  console.log(props);
  const [goldType, setGoldType] = useState(GoldType.all);
  const [orderType, setOrderType] = useState(OrderType.heat);
  const [gitHubOrderType, setGitHubOrderType] = useState<GitHubOrderType>(
    "trending"
  );
  const [period, setPeriod] = useState<GitHubPeriod>("day");
  const [language, setLanguage] = useState<Language>("javascript");
  async function handleGoldTypeChange(value: number) {
    console.log("here is on gold type change");
    console.log(GoldType[value]);
    setGoldType(value);
    const list = await getGoldData(value, orderType);
    props.changeGoldList(list);
    // 拿到值发起请求重新渲染页面
  }

  async function handleOrderTypeChange(e: RadioChangeEvent) {
    console.log(OrderType[e.target.value]);
    setOrderType(e.target.value);
    const list = await getGoldData(goldType, e.target.value);
    props.changeGoldList(list);
  }

  async function handleGitHubOrderChange(value: GitHubOrderType) {
    setGitHubOrderType(value);
    const list = await getGitHubData(language, value, period);
    props.changeGitHubList(list);
  }

  async function handleGitHubPeriodChange(value: GitHubPeriod) {
    setPeriod(value);
    const list = await getGitHubData(language, gitHubOrderType, value);
    props.changeGitHubList(list);
  }

  async function handleLanguageChange(value: Language) {
    setLanguage(value);
    const list = await getGitHubData(value, gitHubOrderType, period);
    props.changeGitHubList(list);
  }

  return (
    <div className="index">
      <div className="navbar">
        <div className="logo" />
        <div className="search-input"></div>
        <Input placeholder="掘金搜索，如：Java，阿里巴巴，前端面试"></Input>
      </div>
      <div className="main-content">
        <div className="left-box">
          <div className="gold-header">
            <img src="/favicon.ico" alt="" />
            <div className="title">掘金</div>
            <TypeSelect
              defaultValue={GoldType.all}
              onChange={handleGoldTypeChange}
              selectList={[
                { name: "首页", value: GoldType.all },
                { name: "前端", value: GoldType.frontend },
                { name: "后端", value: GoldType.backend }
              ]}
            />
            <Radio.Group
              defaultValue={OrderType.heat}
              className="gold-order-radio"
              onChange={handleOrderTypeChange}
            >
              <Radio.Button value={OrderType.heat}>热门</Radio.Button>
              <Radio.Button value={OrderType.time}>最新</Radio.Button>
            </Radio.Group>
          </div>
          <div className="gold-list">
            <List
              dataSource={props.leftList}
              renderItem={item => (
                <List.Item className="gold-item" key={item.id}>
                  <div className="left-number">
                    <Icon type="caret-up" />
                    <div className="like-number">{item.collectionCount}</div>
                  </div>
                  <div className="right-content">
                    <div className="title">{item.title}</div>
                    <div className="down-box">
                      <div className="meat-item">
                        {getDateString(new Date(item.date.iso))}
                      </div>
                      <div className="meat-item">{item.user.username}</div>
                    </div>
                  </div>
                </List.Item>
              )}
            ></List>
          </div>
        </div>
        <div className="right-box">
          <div className="right-header">
            <div className="git-hub-left">
              <div className="icon-box">
                <Icon className="git-hub" type="github" />
                <div className="git-hub-text">GitHub</div>
              </div>
              <TypeSelect
                defaultValue={OrderType.heat}
                onChange={handleGitHubOrderChange}
                selectList={[
                  { name: "热门", value: OrderType.heat },
                  { name: "最新", value: OrderType.time }
                ]}
              />
              <TypeSelect
                defaultValue={period}
                onChange={handleGitHubPeriodChange}
                selectList={[
                  { name: "本日", value: "day" },
                  { name: "本周", value: "week" },
                  { name: "本月", value: "month" }
                ]}
              />
            </div>
            <div className="git-hub-right">
              <TypeSelect
                className="language"
                defaultValue={language}
                onChange={handleLanguageChange}
                selectList={[
                  { name: "JavaScript", value: "javascript" },
                  { name: "HTML", value: "html" },
                  { name: "CSS", value: "css" }
                ]}
              />
            </div>
          </div>
          <div className="git-hub-list">
            <List
              dataSource={props.rightList}
              renderItem={item => (
                <List.Item className="git-hub-item" key={item.id}>
                  <div className="title item-width">
                    <h2>{`${item.username} / ${item.reponame}`}</h2>
                  </div>
                  <div className="content item-width">{item.description}</div>
                  <div className="footer item-width">
                    <div className="start icon">
                      <Icon type="star" theme="filled" />
                      {item.starCount}
                    </div>
                    <div className="fork icon">
                      <Icon type="fork" />
                      {item.forkCount}
                    </div>
                    <div className="language">
                      <div
                        className="lang-dot"
                        style={{ backgroundColor: item.langColor }}
                      ></div>
                      <span>{item.lang}</span>
                    </div>
                  </div>
                </List.Item>
              )}
            ></List>
          </div>
        </div>
      </div>
    </div>
  );
};

async function getGoldData(
  goldType: GoldType,
  orderType: OrderType,
  offset = 0,
  limit = 30
): Promise<Gold[]> {
  const res = await Axios.post("http://localhost:4001/resources/gold", {
    category: GoldType[goldType],
    order: OrderType[orderType],
    offset: offset,
    limit: limit
  });
  return res.data.data;
}

async function getGitHubData(
  language: Language,
  orderType: GitHubOrderType,
  period: GitHubPeriod,
  offset = 0,
  limit = 30
): Promise<GitHub[]> {
  const res = await Axios.post("http://localhost:4001/resources/github", {
    category: orderType,
    lang: language,
    period,
    offset,
    limit
  });
  return res.data.data;
}

//如果不是多页面共用数据的话store 反而是负担
Home.getInitialProps = async (ctx: MyCtx) => {
  const [leftList, rightList] = await Promise.all([
    getGoldData(GoldType.all, OrderType.heat),
    getGitHubData("javascript", "trending", "day")
  ]);
  ctx.reduxStore.dispatch(addGoldList(leftList));
  ctx.reduxStore.dispatch(changeGitHubList(rightList));
  return {};
};

export default connect(
  state => ({
    ...state.home
  }),
  {
    addGoldList,
    changeGoldList,
    changeGitHubList,
    addGitHubList
  }
)(Home);
