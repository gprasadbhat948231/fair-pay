import React from "react";
import { Routes, Route } from "react-router";
import HomeComponent from "./Home";
import Expenses from "./Expenses";
import GroupList from "./GroupList";
import SettleRemaining from "./SettleRemaining";
import NoPageFound from "./NoPageFound";
import Registration from "./Registration";
import Login from "./Login";
import Contacts from "./Contacts";
import CreateGroup from "./CreateGroup";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeComponent />}></Route>
      <Route path="/expenses" element={<Expenses />}></Route>
      <Route path="/groups" element={<GroupList />}></Route>
      <Route path="/amount-settle" element={<SettleRemaining />}></Route>
      <Route path="/registration" element={<Registration />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/contacts" element={<Contacts />}></Route>
      <Route path="/create-group" element={<CreateGroup />}></Route>
      <Route path="*" element={<NoPageFound />}></Route>
    </Routes>
  );
};

export default AllRoutes;
