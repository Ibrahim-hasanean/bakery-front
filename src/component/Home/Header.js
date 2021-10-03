import React from "react";
import Boxes from "../helpers/Boxes";

const Header = ({ data }) => {
  const SummaryData = [
    { title: "عدد المستخدمين", value: data?.usersCount },
    { title: "الدقيق الكلي", value: data?.totalFlour },
    { title: "الخبز الكلي", value: data?.totalBreed },
    { title: "الدقيق المتبقي", value: data?.restFlour },
    { title: "الرصيد الكلي", value: data?.totalAccount },
    { title: "الخبز على الحساب", value: data?.totalDebt },
    { title: "المبلغ المدفوع", value: data?.totalPayed },
    { title: "المبلغ المتبقي", value: data?.restAccount },
  ];
  return <Boxes SummaryData={SummaryData} />;
};

export default Header;
