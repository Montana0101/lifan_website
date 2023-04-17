import {
  AliOss,
  ThemeColor,
  CutLine,
  barFontSize,
  barHeight,
} from "../../lib/const";
import React, { useEffect, useState, useRef } from "react";
import {
  Carousel,
  Modal,
  Form,
  Input,
  Popconfirm,
  Button,
  Col,
  Row,
  message,
} from "antd";
import { NavigateButton } from "../../component/button";
import { FormOutlined } from "@ant-design/icons";
import { consult, getNewsList } from "../../apis/index";
import store from "../../store/index";
import Banner1 from "../../../src/static/imgs/banner1.png";
import "./index.less";
import IS1 from "./images/1.png";
import IS2 from "./images/2.png";
import IS3 from "./images/3.png";
import IS4 from "./images/4.webp";
import IS5 from "./images/5.png";
import IS6 from "./images/6.webp";
import IS7 from "./images/7.webp";
import IS8 from "./images/8.webp";
import IS9 from "./images/9.webp";
import stiacn_png from "../../static/imgs/banner3.png";
import task_png from "../../static/imgs/taskBg.png";

const contentStyle = {
  height: "5rem",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
};

// 双碳资讯
const tastArr = [
  "搭建技术创新平台",
  "研究商业创新模式",
  "推动行业标准制定",
  "搭建资本合作平台",
  "联合产品市场推广",
];

const news = [
  {
    year: "2022",
    month: "08",
    day: "14",
    title: " 上海碳中和技术创新立帆第一届理事会代表大会顺利召开!",
    inx: null,
    link: "https://mp.weixin.qq.com/s/lqIH3Fu9Qr1bCNKLm1cRKA",
  },
  {
    year: "2022",
    month: "06",
    day: "15",
    title: "上海碳中和技术创新立帆“云签约”活动成功举办",
    inx: "4",
    link: null,
  },
  // {
  //   year: "2022",
  //   month: "04",
  //   day: "01",
  //   title:
  //     " 聚焦绿色低碳在沪外企——上海市外商投资协会召开“碳中和博览会”线上推介会",
  //   inx: null,
  //   link: "https://mp.weixin.qq.com/s/02SNGgy2hPyIGckaF6oz3g",
  // },
  {
    year: "2021",
    month: "12",
    day: "17",
    title: " 沪科〔2021〕497号关于同意成立上海碳中和技术创新立帆的批复",
    inx: "1",
    link: null,
  },
  {
    year: "2021",
    month: "12",
    day: "13",
    title: " 上海碳中和技术创新立帆发起人会议在新能源中心召开",
    inx: "2",
    link: null,
  },
  // {
  //   year: "2021",
  //   month: "12",
  //   day: "13",
  //   inx: "3",
  //   link: null,
  //   title:
  //     " 中共中央 国务院关于完整准确全面贯彻新发展理念做好碳达峰碳中和工作的意见(2021年9月22日)",
  // },
];

var IndustryData = [
  { name: "化工", img: IS1 },
  { name: "能源", img: IS2 },
  { name: "钢铁", img: IS3 },
  { name: "纺织", img: IS4 },
  { name: "机械", img: IS9 },
  { name: "电子", img: IS5 },
  { name: "酒店", img: IS6 },
  { name: "餐饮", img: IS7 },
  { name: "娱乐", img: IS8 },
];

const bannerArr1 = [

  "打造百亿新市场",
  "建设行业新生态",
  "树立企业新标杆",
  "构筑商业新范式",
  "开创产业新未来",
];

const bannerArr2 = ["工业节能", "建筑节能", "交通节能"];

// 首页首屏
export default function Home(props) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [content, setContent] = useState("");
  const [amount, setAmount] = useState(null);
  const [list, setList] = useState([]);
  var formRef = useRef();

  const onSubmit = async () => {
    setModalVisible(true);
    if (name && phone && content) {
      const params = {
        consultCompany: name,
        phone: phone,
        consultContent: content,
      };
      const res = await consult(params);
      if (res.success) {
        message.success("感谢您的咨询，请耐心等待我们的回复。");
        setModalVisible(false);
        formRef.current.setFieldsValue({
          name: "",
          phone: "",
          content: "",
        });
      } else {
        message.error(res.msg);
      }
    } else {
      message.warn("请填写完整后再提交");
    }
  };

  const onCancel = () => {
    setModalVisible(false);
    formRef.current.setFieldsValue({
      name: "",
      phone: "",
      content: "",
    });
  };

  useEffect(() => {
    if (!isModalVisible) {
      setName("");
      setPhone("");
      setContent("");
    }
    // document.body.scrollTop = 0;
  }, [isModalVisible]);

  useEffect(() => {
    store.subscribe(() => {
      setAmount(store.getState().amount);
    });
    // _getNewsList();
  }, []);

  const _getNewsList = async () => {
    const res = await getNewsList({
      page: 1,
      limit: 4,
    });
    try {
      if (res.code === 2000 && res.success) {
        setList(res.result.data);
      } else {
        message.warn("获取新闻失败")
      }
    } catch (err) {
      console.log("异常报错", err)
      message.error("异常错误i")
    }
  };

  return (
    <div
      style={{ position: "relative", width: "100%", height: "100%" }}
      className="home_page_1"
    >
      {/* 客服框 */}
      {/* <section
        className="consult"
        onClick={() => {
          setModalVisible(true);
        }}
      >
        <FormOutlined style={{ fontSize: "0.3rem" }} />
        <span>业务咨询</span>
      </section> */}

      <Modal
        title="编辑信息"
        visible={isModalVisible}
        centered
        onCancel={onCancel}
        okText={
          <Popconfirm
            title="确认提交您的咨询内容吗？"
            onConfirm={() => {
              onSubmit();
            }}
            onCancel={() => {
              onCancel();
            }}
            okText="确定"
            cancelText="取消"
          >
            <a href="#">确认</a>
          </Popconfirm>
        }
        cancelText="取消"
      >
        <Form name="nest-messages" ref={formRef}>
          <Row>
            <Col span={11}>
              <Form.Item label="企业名称" name="name">
                <Input onChange={(e) => setName(e.target.value)} />
              </Form.Item>
            </Col>
            <Col span={2}></Col>
            <Col span={11}>
              <Form.Item label="联系方式" name="phone">
                <Input
                  type="number"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item label="咨询内容" span={24} name="content">
                <Input.TextArea
                  placeholder="请输入咨询内容，最多300个字"
                  style={{ width: "100%" }}
                  onChange={(e) => setContent(e.target.value)}
                  maxLength={300}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ color: "rgba(0,0,0,0.5)", fontSize: "0.14rem" }}>
            您也可以选择以下方式直接进行咨询：
          </Row>
          <Row style={{ color: "rgba(0,0,0,0.5)", fontSize: "0.14rem" }}>
            电话：021-66858866 邮箱：green@stiacn.com
          </Row>
        </Form>
      </Modal>

      <section>
        <Carousel autoplay={true} effect="fade" autoplaySpeed={4000}>
          <div className="banner_area">
            <h3 style={contentStyle}>
              <img
                src={Banner1}
                alt=""
              />
              <section
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  top: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "1rem",
                  color: "white",
                }}
              >
                <div style={{ height: "0.8rem" }}>
                  <div
                    style={{
                      height: "0.22rem",
                      fontSize: "0.3rem",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  ></div>
                  <div
                    style={{
                      height: "0.5rem",
                      fontSize: "0.3rem",
                      fontWeight: "bold",
                    }}
                  >
                    聚焦服务，助力未来
                  </div>
                </div>

                <ul
                  style={{
                    height: "1.1rem",
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  {bannerArr1.map((item, index) => {
                    return (
                      <li
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          height: "100%",
                          justifyContent: "center",
                          position: "relative",
                          width: "2rem",
                          boxSizing: "border-box"
                        }}
                      >
                        <img
                          src={
                            AliOss +
                            `/new_version_0518/index_banner_1_icon_${index + 1
                            }.png`
                          }
                          alt=""
                          style={{ width: "0.4rem", height: "0.4rem"}}
                        />
                        <section
                          style={{
                            fontSize: "0.12rem",
                            fontWeight: "bold",
                            width: "100%",
                            height: "0.4rem",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {item}
                        </section>
                      </li>
                    );
                  })}
                </ul>
              </section>
            </h3>
          </div>

          {/* 第二个 */}
          {/* <div className="banner_area">
            <h3 style={contentStyle}>
              <img
                src={AliOss + `/new_version_0518/index_banner_2.png`}
                alt=""
              />
              <section
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  top: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "1rem",
                  color: "white",
                }}
              >
                <div style={{ height: "0.8rem" }}>
                  <div
                    style={{
                      height: "0.5rem",
                      fontSize: "0.3rem",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    实现碳中和的方式
                  </div>
                  <div
                    style={{
                      height: "0.3rem",
                      fontSize: "0.22rem",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    节能减排是可持续发展的必然道路
                  </div>
                </div>

                <ul
                  style={{
                    height: "1.1rem",
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  {bannerArr2.map((item, index) => {
                    return (
                      <li
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          height: "100%",
                          justifyContent: "center",
                          position: "relative",
                          width: "2rem",
                          boxSizing: "border-box",
                        }}
                      >
                        <img
                          src={
                            AliOss +
                            `/new_version_0518/index_banner_2_icon_${
                              index + 1
                            }.png`
                          }
                          alt=""
                          style={{ width: "0.4rem", height: "0.4rem" }}
                        />
                        <section
                          style={{
                            fontSize: "0.12rem",
                            fontWeight: "bold",
                            width: "100%",
                            height: "0.4rem",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {item}
                        </section>
                      </li>
                    );
                  })}
                </ul>
              </section>
            </h3>
          </div> */}

          {/* 第三个 */}
          <div className="banner_area">
            <h3 style={contentStyle}>
              <img
                src={AliOss + `/new_version_0518/index_banner_3.png`}
                alt=""
              />
              <section
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  top: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "1rem",
                  color: "white",
                }}
              >
                <div
                  style={{
                    fontSize: "0.3rem",
                    fontWeight: "bold",
                    width: "100%",
                    position: "absolute",
                    bottom: "1.9rem",
                    left: 0,
                    right: 0,
                    color: "white",
                  }}
                >
                  广泛的业务范围
                </div>
                <div
                  style={{
                    fontSize: "0.22rem",
                    fontWeight: "bold",
                    position: "absolute",
                    width: "100%",
                    bottom: "1.4rem",
                    left: 0,
                    right: 0,
                    color: "white",
                  }}
                >
                  技术合作、技术转化、技术服务、人才培训
                </div>
                {/* <div style={{
                   width: "100%", background: "red",
                  display: "flex",
                  flexDirection: "column", justifyContent: "space-between",
                 alignItems: "center", flexWrap: "no-wrap", position: "relative"
                }}>
                  <div style={{
                    fontSize: "0.3rem", fontWeight: "bold", margin: "0 auto",
                    width: "100%",
                    color: "white"
                  }}>广泛的业务范围</div>
                  <div style={{
                    fontSize: "0.22rem", fontWeight: "bold",
                    width: "100%",
                    color: "white"
                  }}>技术合作、技术转化、技术服务、金融服务、人才培训</div>
                </div> */}
              </section>
            </h3>
          </div>
        </Carousel>
      </section>

      {/* 分割区域 */}
      <div
        style={{
          borderLeft: CutLine,
          borderRight: CutLine,
          height: barHeight,
          margin: "0 0.5rem",
        }}
      ></div>
      {/* 新闻动态 */}
      <div
        style={{ borderTop: CutLine, padding: "0 0.5rem" }}
        className="news_area"
      >
        <h3
          style={{
            fontSize: barFontSize,
            fontWeight: "bold",
            display: "flex",
            margin: 0,
            padding: "0 0.3rem",
            color: ThemeColor,
            height: barHeight,
            lineHeight: barHeight,
            borderLeft: CutLine,
            borderRight: CutLine,
          }}
        >
          关于立帆
        </h3>
        <section style={{ border: CutLine, padding: "0.3rem" }}>
          <div style={{ display: "flex" }}>
            <div
              style={{
                width: "60%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                fontSize: "0.12rem",
                paddingRight: "0.3rem",
                color: "rgba(0,0,0,0.77)",
              }}
            >
              <div style={{ textAlign: "left", lineHeight: "0.25rem" }}>
                {/* 立帆全称为江苏立帆集团（以下称“立帆”） */}
              </div>
              <div style={{ textAlign: "left", lineHeight: "0.25rem" }}>
                江苏立帆是一家专业的服务公司，致力于为各大企业提供优质的人力资源服务。我们与众多知名企业建立了长期的合作关系，为企业提供短期、长期、临时、专业化等各类人力资源派遣服务。 我们的员工团队拥有丰富的行业经验和专业技能，能够迅速适应不同的工作环境和工作内容，为企业提供卓越的人力资源支持。我们秉承诚信、专业、高效的服务理念，为企业提供全方位、多元化的人力资源服务，力求实现企业和员工的双赢。 我们的服务范围涉及多个行业领域，包括制造业、服务业、金融业、信息技术等，覆盖了不同级别、不同岗位的人力资源需求。我们深入了解企业的需求，制定适合企业的人力资源方案，并提供专业的人才筛选、培训、管理等服务，为企业提供高效、精准的人力支持。 我们坚持以客户为中心，不断提升服务质量和水平，赢得了广大客户的信赖和支持。我们将继续秉承专业、务实、创新的服务理念，努力为客户提供更优质、更高效的人力资源服务。
              </div>
              <p
                style={{
                  width: "1.2rem",
                  height: "0.4rem",
                  alignSelf: "flex-start",
                  marginTop: "0.05rem",
                }}
                onClick={() => { }}
              >
                {/* <NavigateButton
                  content={"更多信息"}
                  color={ThemeColor}
                  path={`/about`}
                /> */}
              </p>
            </div>
            <div
              style={{
                flex: 1,
              }}
            >
              <img src={stiacn_png} style={{ width: "100%", borderRadius: "20px" }} />
            </div>
          </div>

          <div style={{ marginTop: "0.45rem", position: "relative" }}>
            <img src={task_png} style={{ width: "100%" }} />
            <section
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                top: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "0.4rem 1rem",
                color: "white",
              }}
            >
              <p
                style={{
                  height: barHeight,
                  fontSize: barFontSize,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                立帆目标
              </p>
              <ul
                style={{
                  height: "1.1rem",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                {tastArr.map((item, index) => {
                  return (
                    <li
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <img
                        src={
                          AliOss +
                          `/new_version_0518/index_mission_icon_${index + 1
                          }.png`
                        }
                        alt=""
                        style={{ width: "0.5rem" }}
                      />
                      <span style={{ fontSize: "0.12rem", fontWeight: "bold" }}>
                        {item}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>
          </div>
        </section>
      </div>



      {/* 业务范围 */}
      <div
        style={{ borderTop: CutLine, padding: "0 0.5rem" }}
        className="news_area"
      >
        <h3
          style={{
            fontSize: barFontSize,
            fontWeight: "bold",
            display: "flex",
            margin: 0,
            padding: "0 0.3rem",
            color: ThemeColor,
            height: barHeight,
            lineHeight: barHeight,
            border: CutLine,
            borderTop: "none",
          }}
        >
          合作行业
        </h3>
        <h3
          style={{
            fontSize: barFontSize,
            fontWeight: "bold",
            display: "flex",
            margin: 0,
            color: ThemeColor,
            height: "1.6rem",
            lineHeight: "1.6rem",
            boxSizing: "border-box",
            borderLeft: CutLine,
            borderRight: CutLine,
            borderBottom: CutLine,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              background: "white",
              zIndex: 77,
              right: "0",
              width: "0.3rem",
              top: 0,
              bottom: 0,
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              background: "white",
              zIndex: 77,
              left: "0",
              width: "0.3rem",
              top: 0,
              bottom: 0,
            }}
          ></div>
          <section
            style={{
              width: "150%",
              borderLeft: CutLine,
              position: "absolute",
              left: "0.3rem",
              top: 0,
              bottom: 0,
              display: "flex",
              flexWrap: "nowrap",
              overflow: "hidden",
            }}
            className="animate"
          >
            {IndustryData.map((item, index) => {
              return (
                <div
                  style={{
                    display: "inline-flex",
                    width: "20%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    borderLeft: CutLine,
                    borderRight: CutLine,
                    zIndex: 999,
                  }}
                >
                  <div
                    style={{
                      height: "50%",
                      width: "84%",
                      borderRadius: "0.1rem",
                      position: "relative",
                      display: "flex",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={item.img
                      }
                      alt=""
                      style={{ height: "100%", width: "100%" }}
                    />
                    <section
                      style={{
                        position: "absolute",
                        bottom: 0,
                        height: "0.25rem",
                        background: "rgba(0,0,0,0.3)",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "white",
                        fontSize: "0.12rem",
                      }}
                    >
                      {item.name}
                    </section>
                  </div>
                </div>
              );
            })}
          </section>
        </h3>
      </div>
      <footer>
          <a href="https://beian.miit.gov.cn/" target="_blank">备案号：苏ICP备2023007444号-1</a>
        </footer>
    </div>
  );
}
