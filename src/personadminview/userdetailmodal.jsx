import React, { useState } from "react";

import { Modal, Button, Form } from "react-bootstrap";

export default function UserDetailModal({ user, onSave }) {
  const [fullname, setFullname] = useState(user.fullname);
  const [email, setEmail] = useState(user.email);

  const handleClose = () => onSave(null);
  const handleSave = () => {
    const u = {
      personId: user.personId,
      email: email,
      fullname: fullname
    };
    onSave(u);
  };

  return (
    <Modal show={user != null} onHide={handleClose}>
      <Modal.Header closeButton>Edit Person Details</Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="fullname">
            <Form.Label>Fullname</Form.Label>
            <Form.Control
              type="text"
              value={fullname}
              onChange={e => setFullname(e.target.value)}
            />
            <Form.Text className="text-muted">
              Fullname of the employee
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              Username or email address
            </Form.Text>
          </Form.Group>
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
