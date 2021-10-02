import React from "react";
import Boxes from "../helpers/Boxes";

const Header = ({ data }) => {
  const SummaryData = [
    { title: "الدقيق الكلي", value: data?.totalFlour },
    { title: "الدقيق المتبقي", value: data?.restFlour },
    { title: "الرصيد الكلي", value: data?.totalAccount },
    { title: "الخبز الكلي", value: data?.totalBreed },
    { title: "المبلغ المدفوع", value: data?.totalPayed },
    { title: "المبلغ المتبقي", value: data?.restAccount },
  ];
  return <Boxes SummaryData={SummaryData} />;
};

export default Header;
