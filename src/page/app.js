import "./app.less";
import { Button, message } from "antd";
import {
  BrowserRouter as Router,
  withRouter,
  useHistory,
} from "react-router-dom";
import Routers from "../route/index";
import { useEffect, useState } from "react";
import { messageTips } from "../apis/index";
import { portrait } from "../apis/index"
import Logo from "../../src/static/logo/logo2.png";


// const logo = AliOss + "/img/logo.png";

const titles = [
  "首页",
  "", //关于立帆
  '',
  // "联盟动态",
  "业务范围",
  "", // '专业委员会'
  "", // 双碳咨询
  "联系我们",
];

var titleArr = [
  { inx: 0, path: "/" },
  { inx: 1, path: "/about" },
  // { inx: 2, path: "/dynamic" },
  // { inx: 3, path: "/" },
  { inx: 3, path: "/scope" },
  { inx: 4, path: "/council" },
  // { inx: 5, path: "/" },
  { inx: 5, path: "/consult" },
  { inx: 6, path: "/contact" },
];

let HeaderCmt = () => {
  const [flag, setFlag] = useState(false); //隐藏title
  const [inx, setInx] = useState(0);
  const [logined, checkLogin] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [tips, setTips] = useState(0);
  const [hide, setHide] = useState(false);
  const [result, setResult] = useState(false);
  const [company, setCompany] = useState("")
  const history = useHistory();

  useEffect(() => {
    const unlisten = history.listen((href) => {
      href = href.pathname;
      if (href.indexOf("register") != -1 || href.indexOf("login") != -1) {
        setFlag(true);
      } else {
        setFlag(false);
      }
    });
    return () => {
      unlisten();
    };
  }, [history]);

  useEffect(() => {
    let href = window.location.href;
    if (href.indexOf("about") != -1) {
      setInx(1);
    } else if (href.indexOf("contact") != -1) {
      setInx(6);
    } else if (href.indexOf("council") != -1) {
      setInx(4);
    } else if (href.indexOf("dynamic") != -1) {
      // setInx(2);
    } else if (href.indexOf("/news") != -1) {
      // setInx(2);
    } else if (href.indexOf("scope") != -1) {
      setInx(3);
    } else if (href.indexOf("consult") != -1) {
      setInx(5);
    } else if (href.indexOf("/") == -1) {
      setInx(0);
    }
  }, []);

  useEffect(() => {
    const check = localStorage.getItem("user");
    if (JSON.parse(check)) {
      checkLogin(true);
      setUserInfo(JSON.parse(check));
      _messageTips();
    } else {
      checkLogin(false);
    }
  }, []);

  const _portrait = async () => {
    const res = await portrait(company)
    if (res && res.code == 2000) {
      setResult(res.result)
      localStorage.setItem('search', JSON.stringify(res.result))
      // history.push("/")
      setInx(null)
      setCompany("")
      history.push("/result", { value: JSON.stringify(res.result) })
    } else {
      message.warn('未查询到该公司数据！')
    }
  }

  const _messageTips = async () => {
    const res = await messageTips();
    if (res && res.code === 2000) {
      setTips(res.result);
    }
  };

  return (
    <div
      className="header-layout"
      style={{
        display: flag ? "none" : " block",
      }}
    >
      <header
        className="app-header"
        style={{
          height: "0.78rem !important",
          // border:"1px solid red"
        }}
      >
        <section className="header-left" onClick={() => {
          history.push("/")
          setInx(0);
        }}>
          <img
            src={Logo}
            alt=""
            style={{
              height: "0.78rem",
              marginRight: "0.1rem",
              width: "0.78rem",
            }}
          />
          <div
            style={{
              height: "70%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              boxSizing: "border-box",
            }}
          >
            <span
              style={{
                fontSize: "0.16rem",
                fontWeight: "bold",
                color: "black",
              }}
            >
              LFKJ
            </span>
            <span style={{ color: "rgba(0,0,0,0.6)", fontSize: "0.14rem" }}>
              立帆科技
            </span>
          </div>
        </section>
        <section className="header-right">
          {/* <div
            style={{
              height: "50%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              padding: "0.04rem 0.19rem 0.04rem 0",
            }}
          >
            <Input
              id="input_search"
              placeholder="请输入企业名称全称"
              style={{
                width: "2rem",
                padding: "border-box",
                display: !hide ? "none" : "block",
              }}
              value={company}
              onChange={e=>{setCompany(e.target.value)}}
              onKeyDown={(ev) => {
                if (ev.keyCode == 13) {
                  if(company){
                    _portrait()
                  }else{
                    message.warn("请输入公司名称")
                  }
                }
              }}
            />
            <SearchOutlined
                id="icon_search"
              style={{ fontWeight: "bold", color: "#7B7B7B", width: "0.5rem" }}
              onClick={() => {
                if (logined) {
                  setHide(!hide);
                } else {
                  message.warn({
                    content: "请登录",
                    style: { zIndex: 88888888888 },
                  });
                }
              }}
            />
  
            {!logined ? (
              <div
                style={{
                  color: "#7B7B7B",
                  fontSize: "0.12rem",
                  fontWeight: "bold",
                  width: "0.5rem",
                  cursor: "pointer",
                }}
                onClick={() => {
                  window.location.href = "/login";
                }}
              >
                登录
              </div>
            ) : (
              <div
                style={{
                  color: "#7B7B7B",
                  fontSize: "0.14rem",
                  width: "0.5rem",
                  cursor: "pointer",
                  position: "relative",
                  clear: "both",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onMouseLeave={() => {
                  setDialog(false);
                }}
                onMouseOver={() => {
                  setDialog(true);
                }}
              >
                <div
                  style={{
                    border: "1px solid grey",
                    width: "0.2rem",
                    height: "0.2rem",
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "0.1rem",
                  }}
                >
                  <UserOutlined style={{ fontSize: "0.14rem" }} />
                  {tips > 0 && (
                    <span
                      style={{
                        position: "absolute",
                        height: "0.08rem",
                        width: "0.08rem",
                        background: "red",
                        borderRadius: "50%",
                        right: "-0.05rem",
                        top: 0,
                      }}
                    ></span>
                  )}
                </div>
                {dialog && (
                  <section
                    style={{
                      position: "absolute",
                      top: "0.2rem",
                      left: "0.25rem",
                      border: "1px solid #51AA52",
                      width: "0.9rem",
                      zIndex: 77777777,
                      background: "white",
                      borderRadius: "0.02rem",
                      height: "0.3rem",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.12rem",
                        height: "0.3rem",
                        display: "flex",
                        color: "rgba(0,0,0,0.5)",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#51AA52",
                      }}
                      onClick={() => {
                        if (userInfo) {
                          if (userInfo.role * 1 === 1) {
                            window.location.href = "/admin";
                          } else {
                            window.location.href = "/common";
                          }
                        }
                      }}
                    >
                      {userInfo && userInfo.name}
                    </div>
                  </section>
                )}
              </div>
            )}

            {!logined ? (
              <div
                style={{
                  color: "#7B7B7B",
                  fontWeight: "bold",
                  fontSize: "0.12rem",
                  width: "0.5rem",
                  cursor: "pointer",
                }}
                onClick={() => {
                  history.push("/register");
                }}
              >
                注册
              </div>
            ) : (
              <div
                style={{
                  color: "#7B7B7B",
                  fontWeight: "bold",
                  fontSize: "0.12rem",
                  width: "0.5rem",
                  cursor: "pointer",
                }}
                onClick={() => {
                  localStorage.removeItem("user");
                  checkLogin(false);
                  window.location.href = "/";
                }}
              >
                退出
              </div>
            )}
          </div>
       */}
          <div style={{
            height: "50%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: "0.04rem 0.19rem 0.04rem 0",
          }}>
            <div>
              <a href="http://101.43.49.47:2023/" target={"_blank"} style={{
                color: "#7B7B7B",
                fontSize: "0.12rem",
                fontWeight: "bold",
                width: "0.5rem",
                cursor: "pointer",
                borderBottom: "1px solid green",
                padding: "0.05rem 0rem",
                marginRight: "0.15rem"
                // border:"1px solid red"
              }}>后台链接</a>

            </div>
          </div>
          <ul
            style={{
              height: "50%",
              // width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              margin: "0",
              zIndex: 0,
            }}
          >
            {titles.map((item, index) => {
              return (
                item && <li
                  style={{
                    color: index == inx ? "white" : "#51AA52",
                    fontWeight: "bold",
                    height: "0.3rem",
                    display: "flex",
                    width: "1.2rem",
                    // border:"1px solid green",
                    // flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.14rem",
                    cursor: "pointer",
                    background: index == inx ? "#51AA52" : "white",
                    borderRadius: "0.2rem",
                  }}
                  onClick={() => {
                    titleArr.map((obj) => {
                      if (item == titles[obj.inx]) {
                        // if (obj.inx == 5 || obj.inx==3) {
                        //   setInx(0);
                        // } else {
                        //
                        // }
                        window.scroll(0, 0);
                        setInx(obj.inx);
                        history.push(obj.path);
                      }
                    });
                  }}
                >
                  {item}
                </li>
              );
            })}
          </ul>
        </section>
      </header>
      <div style={{ height: "0.78rem" }}></div>
    </div>
  );
};

HeaderCmt = withRouter(HeaderCmt);

function App() {
  const [flag, setFlag] = useState(false); //隐藏title

  useEffect(() => {
    console.log(window.location.href);
    let href = window.location.href;
    if (href.indexOf("register") != -1 || href.indexOf("login") != -1) {
      setFlag(true);
    } else {
      setFlag(false);
    }
  }, []);

  return (
    <Router>
      <div className="app">
        {!flag && <HeaderCmt />}
        <main style={{ position: "relative" }} id="main_container">
          <Routers />
        </main>
      </div>
    </Router>
  );
}

export default App;
