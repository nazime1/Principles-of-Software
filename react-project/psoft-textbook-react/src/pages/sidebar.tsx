import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem
} from "cdbreact";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div
      style={{ display: "flex", height: "100vh", position: "fixed", overflow: "scroll initial" }}
    >
      <CDBSidebar className="CDBsidebar" breakpoint={720} minWidth={'100px'} maxWidth={'300px'} toggled={false} textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/#/textbook"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >PSoft
          Textbook
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink to="/textbook/readme">
              <CDBSidebarMenuItem>Forward</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/textbook/introduction">
              <CDBSidebarMenuItem>Introduction</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/textbook/specifications">
              <CDBSidebarMenuItem>Specifications</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/textbook/abstraction">
              <CDBSidebarMenuItem>Abstraction</CDBSidebarMenuItem>
            </NavLink>
             <NavLink to="/textbook/java">
              <CDBSidebarMenuItem>Java</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/textbook/dafny">
              <CDBSidebarMenuItem>Dafny</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/textbook/testing">
              <CDBSidebarMenuItem>Testing</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/textbook/equality">
              <CDBSidebarMenuItem>Identity & Equality</CDBSidebarMenuItem>
            </NavLink>
             <NavLink to="/textbook/generics">
              <CDBSidebarMenuItem>Generics</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/textbook/patterns">
              <CDBSidebarMenuItem>Design Patterns</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/textbook/refactoring">
              <CDBSidebarMenuItem>Refactoring</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/textbook/usability">
              <CDBSidebarMenuItem>Usability</CDBSidebarMenuItem>
            </NavLink>
             <NavLink to="/textbook/gui">
              <CDBSidebarMenuItem>GUI Programming</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/textbook/processes">
              <CDBSidebarMenuItem>Software Processes</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/textbook/appendix">
              <CDBSidebarMenuItem>Appendix</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  )
}