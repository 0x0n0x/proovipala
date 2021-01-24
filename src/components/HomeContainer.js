import React, { useState } from "react";
import { PageHeader, Result } from "antd";
import FirstLevel from "./FirstLevel";
import SecondLevel from "./SecondLevel";

const HomeContainer = () => {
  const [level, setLevel] = useState(0);
  return (
    <div className={"home-container"}>
      <PageHeader className="home-page-header" title="Level" subTitle={level} />
      {level === 0 && <FirstLevel setLevel={setLevel} />}
      {level === 1 && <SecondLevel setLevel={setLevel} />}
      {level === 2 && (
        <Result
          status="success"
          title="Super töö!"
          subTitle="Sinu kood on: 20212021"
        />
      )}
    </div>
  );
};

export default HomeContainer;
