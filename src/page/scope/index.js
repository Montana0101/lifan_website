//  联盟动态
import React, { useState, useEffect } from "react";
import { Pagination } from "antd";
import {
  AliOss,
  ThemeColor,
  CutLine,
  barFontSize,
  barHeight,
  IframeUrl,
} from "../../lib/const";
import { getNewsList } from "../../apis/index";
import scopeBg from "../../static/imgs/scope_bg.png";
import "./index.less";
import store from "../../store/index";

const data = ["战略咨询服务", "人才培养任务"];
const arr = [
  {
    content:
      "我们提供战略咨询服务，帮助客户制定优质的人力资源管理和招聘策略，以促进其业务增长和成功。我们的专家团队在人力资源和招聘方面拥有丰富的经验和知识，可以为政府和企业提供最佳方案。我们的目标是帮助客户在人才市场竞争中获得优势，同时满足员工和公司的需求。      ",
  },
  {
    content:
      "我们致力于为企业提供优质的劳务派遣服务，同时也注重员工的培养和发展。我们为员工提供专业的技能培训，帮助他们不断提升自身的能力和竞争力。我们注重员工的职业规划，为员工提供广阔的职业发展空间和机会。我们相信，只有员工得到有效的培养和发展，企业才能持续稳健地发展，我们将不断努力，为员工提供更好的培训和发展机会。      ",
  },
];

const list = [
  {
    sub: "服务合作",
    text: "开展服务合作，形成重要的产业服务标准",
  },
  {
    sub: "服务转化",
    text: "实现服务转移，提升产业整体竞争力",
  },
  {
    sub: "产权服务",
    text: "建立公共服务平台，实现知识产权共享",
  },
];

const Scope = () => {
  const [inx, setInx] = useState(0);
  const [amount,setAmount] = useState(0)

  useEffect(() => {
    store.subscribe(() => {
      setAmount(store.getState().amount);
    });
  }, []);

  
  return (
    <div className="scope_page">
      <section
        style={{
          height: "100%",
          borderTop: CutLine,
          padding: "0 0.5rem 0 0.5rem",
        }}
      >
        <div
          style={{
            border: CutLine,
            borderBottom: "none",
          }}
        >
          <section
            style={{
              backgroundImage: `url(${scopeBg})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: "3.5rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ul className="upperUl">
              {list.map((item, index) => {
                return (
                  <li key={index}>
                    <img
                      src={`${AliOss}/new_version_0518/business/business_bg_icon_${
                        index + 1
                      }.png`}
                    />
                    <span style={{ fontSize: "0.14rem", fontWeight: "bold",
                    margin:'0.1rem 0 0.05rem 0' }}>
                      {item.sub}
                    </span>
                    <span style={{ fontSize: "0.12rem", fontWeight: "bold" }} className="last_span">
                      {item.text}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>
          <main>
            <ul>
              {data.map((item, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => {
                      setInx(index);
                    }}
                  >
                    <span
                      style={{
                        borderBottom:
                          inx == index ? `2px solid ${ThemeColor}` : "none",
                      }}
                    >
                      {item}
                    </span>
                  </li>
                );
              })}
            </ul>
            {arr.map((item, index) => {
              return (
                <div
                  className="content"
                  style={{
                    display: index == inx ? "flex" : "none",
                  }}
                >
                  <article>
                    <span>{item.content}</span>
                  </article>
                  <img
                    src={`${AliOss}/new_version_0518/business/business_tab_${
                      inx + 1
                    }.png`}
                  />
                </div>
              );
            })}
          </main>
        </div>
      </section>
     
    </div>
  );
};

export default Scope;
