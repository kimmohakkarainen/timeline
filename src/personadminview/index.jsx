import React, { useState } from "react";
/* import { connect } from "react-redux"; */

import { Alert, Container, Row, Col, Button } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";

import UserDetailModal from "./userdetailmodal";
import FlexDetailModal from "./flexdetailmodal";
import ProjectPrefModal from "./projectprefmodal";
import PrivilegeModal from "./privilegemodal";
import PasswordModal from "./passwordmodal";

import * as api from "../api";

/* import { fetchPersons, postPerson } from "../actions"; */

const cellOptions = {
  0: "Deleted",
  1: "Closed",
  2: "Contractor",
  3: "Team member",
  4: "Project manager",
  5: "Administrator"
};

function flexFormatter({ person }) {
  const date = person.flexdate;
  if (date != null && date.length > 0) {
  } else {
    return "";
  }
}

function PersonAdminView({ persons }) {
  const [editUserDetails, setUserDetails] = useState(null);
  const [editFlexDetails, setFlexDetails] = useState(null);
  const [editProjectPrefs, setProjectPrefs] = useState(null);
  const [editPrivileges, setPrivileges] = useState(null);
  const [changePassword, setChangePassword] = useState(null);

  const columnsProp = [
    {
      dataField: "personId",
      text: "Person Id",
      headerStyle: { width: "10%" },
      hidden: false
    },
    {
      dataField: "info",
      text: "Personal details",
      headerStyle: { width: "20%" },
      editable: false,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          setUserDetails({});
          api
            .getPerson(row.personId)
            .then(resp => {
              console.log(resp.data);
              /* setUserDetails(resp.data); */
            })
            .catch(error => console.log(error));
        }
      }
    },
    {
      dataField: "flex",
      text: "Flex hours",
      headerStyle: { width: "20%" },
      editable: false,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          setFlexDetails(row);
        }
      }
    },
    {
      dataField: "projects",
      text: "Projects",
      headerStyle: { width: "20%" },
      editable: false,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          setProjectPrefs(row);
        }
      }
    },
    {
      dataField: "rights",
      text: "User rights",
      headerStyle: { width: "20%" },
      editable: false,
      formatter: cell => cellOptions[cell],
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          setPrivileges(row);
        }
      }
    },
    {
      dataField: "password",
      text: "",
      headerStyle: { width: "10%" },
      editable: false,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          setChangePassword(row);
        }
      },

      formatter: (cellContent, row) => <Button>Change Password</Button>
    }
  ];

  return (
    <>
      {editUserDetails && (
        <UserDetailModal
          user={editUserDetails}
          onSave={user => {
            if (user != null) {
              console.log("save pressed");
              console.log(user);
            }
            setUserDetails(null);
          }}
        />
      )}
      {editFlexDetails && (
        <FlexDetailModal
          user={editFlexDetails}
          onSave={user => {
            if (user != null) {
              console.log("save pressed");
              console.log(user);
            }
            setFlexDetails(null);
          }}
        />
      )}
      {editProjectPrefs && (
        <ProjectPrefModal
          user={editProjectPrefs}
          onSave={user => {
            if (user != null) {
              console.log("save pressed");
              console.log(user);
            }
            setProjectPrefs(null);
          }}
        />
      )}
      {editPrivileges && (
        <PrivilegeModal
          user={editPrivileges}
          onSave={user => {
            if (user != null) {
              console.log("save pressed");
              console.log(user);
            }
            setPrivileges(null);
          }}
        />
      )}

      {changePassword && (
        <PasswordModal
          user={changePassword}
          onSave={user => {
            if (user != null) {
              console.log("save pressed");
              console.log(user);
            }
            setChangePassword(null);
          }}
        />
      )}

      <BootstrapTable
        bordered
        striped
        bootstrap4
        keyField="personId"
        data={persons}
        columns={columnsProp}
        cellEdit={this.cellEditProp}
      />
    </>
  );
}

export default function index() {
  const props = {
    persons: [
      {
        personId: 1,
        info: "Aapeli [ apel ]",
        fullname: "Aapeli Root",
        email: "apel@ap.fi",
        flexdate: "",
        flexstart: 0,
        rights: 5,
        projects: []
      },
      {
        personId: 2,
        info: "Kiipeli [ kpl ]",
        fullname: "Kiipeli Ruut",
        email: "ruut@ap.fi",
        flexdate: "2020-01-01",
        flexstart: 0,
        rights: 3,
        projects: []
      },
      {
        personId: 3,
        info: "Repeli [ rebel ]",
        fullname: "Rebel Roosna",
        email: "roosna@ap.fi",
        flexdate: "",
        flexstart: 0,
        rights: 0,
        projects: []
      }
    ]
  };
  return PersonAdminView(props);
}
