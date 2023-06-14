import { Col, Row, Layout, Input, Button } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./login.css";
const classNames = require("classnames");

// const { Header, Footer, Sider, Content } = Layout;

function LoginScreen() {
  let [selectedYear, setSelectedYear] = React.useState(null);

  let [fetchState, setFetchState] = React.useState({
    status: "loading",
    fail: { status: false, reason: null },
  });

  let [currentYearMatches, setCurrentYearMatches] = React.useState({
    count: 0,
    meta: [],
  });

  let [match, setMatch] = React.useState(Boolean)

  let [responseData, setResponseData] = React.useState({
    page: 0,
    per_page: 0,
    total: 0,
    total_pages: 0,
    data: [],
  });

  async function onclick(year) {
    setSelectedYear(year);
    try {
      const response = await axios.get(
        `https://jsonmock.hackerrank.com/api/football_competitions?year=${year}`
      );
      console.log("res", response);
      setResponseData(response.data);
    } catch (error) {
      console.error(error);
    }
    setMatch(responseData.data.length) 
  }

  console.log(" ---- responseData", responseData.data);

  let years = [2011, 2012, 2013, 2014, 2015, 2016, 2017];

  return (
    <>
      <div className="layout-row">
        <div className="section-title">Select Year</div>
        <ul className="sidebar" data-testid="year-list">
          {years.map((year) => {
            return (
              <li
                className={classNames({
                  "sidebar-item": true,
                  active: selectedYear === year,
                })}
                onClick={() => onclick(year)}
                key={year}
              >
                <a>{year}</a>
              </li>
            );
          })}
        </ul>

        <section className="content">
          <section>
            <div className="total-matches" data-testid="total-matches">
              Total Matches:
              {match}
            </div>

            <ul className="mr-20 matches styled" data-testid="match-list">
              {responseData.data.map((name) => {
                return <li className="slide-up-fade-in">{name.name}</li>;
              })}
            </ul>
          </section>

          <div
            data-testid="no-result"
            className="slide-up-fade-in no-result"
          ></div>
        </section>
      </div>
    </>
  );
}

export default LoginScreen;
