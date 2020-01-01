import * as next from "next";
import { Store } from "redux";
import { Props } from "react";
import { AppProps } from "next/app";

export enum GoldType {
  all,
  frontend,
  backend
}

export enum OrderType {
  heat,
  time
}

export type Language = "javascript" | "html" | "css";
export type GitHubOrderType = "trending" | "upcome";

export const GET_GOLD_LIST = "GET_GOLD_LIST";
export const CHANGE_GOLD_LIST = "CHANGE_GOLD_LIST";
export const GET_GIT_HUB = "GET_GIT_HUB";
export const CHANGE_GIT_HUB = "CHANGE_GIT_HUB";

export interface User {
  username: string;
  avatar: string;
  url: string;
}

export interface Date {
  __type: "Date";
  iso: "string";
}

export interface Gold {
  id: string;
  title: string;
  url: string;
  originalUrl: string;
  date: Date;
  viewCount: number;
  collectionCount: number;
  user: User;
}

export interface GitHub {
  id: string;
  url: string;
  username: string;
  reponame: string;
  description: string;
  lang: Language;
  langColor: string;
  detailPageUrl: string;
  starCount: number;
  forkCount: number;
}

export interface GetGoldListBody {
  category: "all" | "frontend" | "backend";
  order: "heat" | "time";
  offset: number;
  limit: number;
}

export interface IndexReducer {
  leftList: Gold[];
  rightList: any[];
}

export interface MyPageCtx extends next.NextPageContext {
  ctx?: {
    reduxStore: Store;
  };
}

export interface MyCtx extends next.NextPageContext {
  reduxStore: Store;
}

export interface MyProps extends AppProps {
  initialReduxState?: any;
  reduxStore?: Store;
}

export type GitHubPeriod = "day" | "week" | "month";
