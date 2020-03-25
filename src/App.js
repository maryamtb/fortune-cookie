import React from "react";
import axios from "axios";
import cookie from "./cookie.png";
import {
  Container,
  CardHeader,
  CardFooter,
  Card,
  CardBody,
  Row,
  Col
} from "shards-react";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

const card = {
  textAlign: "center",
  marginTop: "140px"
};

class App extends React.Component {
  state = {
    fortune: "",
    lesson_eng: "",
    lesson_chi: "",
    pron: "",
    lotto: ""
  };

  componentDidMount() {
    this.fetchCookie();
  }

  fetchCookie = () => {
    axios
      .get("http://fortunecookieapi.herokuapp.com/v1/cookie")
      .then(response => {
        const fortune = response.data[0].fortune.message;
        const lesson_eng = response.data[0].lesson.english;
        const lesson_chi = response.data[0].lesson.chinese;
        const pron = response.data[0].lesson.pronunciation;
        const lotto = response.data[0].lotto.numbers;

        this.setState({ fortune, lesson_eng, lesson_chi, pron, lotto });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <Container style={card}>
        <Row>
          <Col sm={{ size: 8, order: 2, offset: 2 }}>
            <Card>
              <CardHeader>
                <h3>Fortune Cookie of the Day</h3>
              </CardHeader>
              <CardBody>
                <div>
                  <h5>{this.state.fortune}</h5>
                </div>
                <h5>
                  <span style={{ fontSize: "14px", marginRight: "40px" }}>
                    Chinese Word:{" "}
                  </span>
                  {this.state.lesson_chi}
                </h5>
                <h5>
                  <span style={{ fontSize: "14px", marginRight: "40px" }}>
                    Meaning:{" "}
                  </span>
                  {this.state.lesson_eng}
                </h5>
                <h5>
                  <span style={{ fontSize: "14px", marginRight: "40px" }}>
                    Pronunciation:{" "}
                  </span>
                  {this.state.pron}
                </h5>
                <h5>
                  <span style={{ fontSize: "14px", marginRight: "40px" }}>
                    Lotto:{" "}
                  </span>
                  {this.state.lotto}
                </h5>
              </CardBody>
              <CardFooter>
                <img
                  src={cookie}
                  className={cookie}
                  alt={""}
                  style={{ width: 70, height: 70 }}
                  onClick={this.fetchCookie}
                />
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
