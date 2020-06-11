import React, { useState } from "react";

import {
  Modal,
  Button,
  Form,
  Collapse,
  Card,
  ListGroup
} from "react-bootstrap";

export default function ProjectPrefModal({ user, onSave }) {
  const [projects, setProjects] = useState(user.projects);
  const [customerId, setCustomerId] = useState(null);

  const handleClose = () => onSave(null);
  const handleSave = () => {
    const u = {
      personId: user.personId,
      projects: projects
    };
    onSave(u);
  };

  const customers = [
    {
      customerId: 1,
      name: "Asiakas",
      projects: [
        { projectId: 2, name: "Roject", selected: false },
        { projectId: 2, name: "Roject", selected: false },
        { projectId: 2, name: "Roject", selected: false },
        { projectId: 2, name: "Roject", selected: true },
        { projectId: 2, name: "Roject", selected: false },
        { projectId: 2, name: "Roject", selected: false },
        { projectId: 2, name: "Roject", selected: false },
        { projectId: 2, name: "Roject", selected: false }
      ]
    },
    {
      customerId: 2,
      name: "Asiakas",
      projects: [
        { projectId: 2, name: "Roject", selected: false },
        { projectId: 2, name: "Roject", selected: false },
        { projectId: 2, name: "Roject", selected: false },
        { projectId: 2, name: "Roject", selected: true },
        { projectId: 2, name: "Roject", selected: false },
        { projectId: 2, name: "Roject", selected: false },
        { projectId: 2, name: "Roject", selected: false },
        { projectId: 2, name: "Roject", selected: false }
      ]
    },
    {
      customerId: 3,
      name: "Asiakas",
      projects: [
        { projectId: 2, name: "Roject", selected: false },
        { projectId: 2, name: "Roject", selected: false },
        { projectId: 2, name: "Roject", selected: false },
        { projectId: 2, name: "Roject", selected: true },
        { projectId: 2, name: "Roject", selected: false },
        { projectId: 2, name: "Roject", selected: false },
        { projectId: 2, name: "Roject", selected: false },
        { projectId: 2, name: "Roject", selected: false }
      ]
    },
    {
      customerId: 4,
      name: "Asiakas",
      projects: [
        { projectId: 2, name: "Roject", selected: false },
        { projectId: 2, name: "Roject", selected: false },
        { projectId: 2, name: "Roject", selected: false },
        { projectId: 2, name: "Roject", selected: true },
        { projectId: 2, name: "Roject", selected: false },
        { projectId: 2, name: "Roject", selected: false },
        { projectId: 2, name: "Roject", selected: false },
        { projectId: 2, name: "Roject", selected: false }
      ]
    }
  ];

  return (
    <Modal show={user != null} onHide={handleClose}>
      <Modal.Header closeButton>Edit Person Rights</Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="password1">
            <Form.Label>Fullname</Form.Label>
            <Form.Control type="text" readOnly defaultValue={user.fullname} />
          </Form.Group>
          {customers.map(customer => {
            return (
              <Collapse
                key={customer.customerId}
                in={customerId == null || customer.customerId === customerId}
              >
                <Card key={customer.customerId}>
                  <Card.Body>
                    <Card.Title>
                      <Button
                        variant={customerId != null ? "light" : "secondary"}
                        onClick={() => {
                          setCustomerId(
                            customerId == null ? customer.customerId : null
                          );
                        }}
                      >
                        {customer.name}
                      </Button>
                    </Card.Title>
                    <Collapse in={customerId != null}>
                      <ListGroup>
                        {customer.projects.map(project => {
                          return (
                            <ListGroup.Item
                              key={project.projectId}
                              onClick={() => this.onChange(project)}
                            >
                              <Form.Check
                                type="checkbox"
                                readOnly
                                checked={project.selected}
                                label={project.name}
                              />
                            </ListGroup.Item>
                          );
                        })}
                      </ListGroup>
                    </Collapse>
                  </Card.Body>
                </Card>
              </Collapse>
            );
          })}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
