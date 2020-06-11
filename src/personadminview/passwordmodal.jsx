import React, { useState } from "react";

import { Modal, Button, Form } from "react-bootstrap";

export default function PasswordModal({ user, onSave }) {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const handleClose = () => onSave(null);
  const handleSave = () => {
    const u = {
      personId: user.personId,
      password1: password1,
      password2: password2
    };
    onSave(u);
  };

  return (
    <Modal show={user != null} onHide={handleClose}>
      <Modal.Header closeButton>Edit Person Flex Hour Details</Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="password1">
            <Form.Label>Fullname</Form.Label>
            <Form.Control type="text" readOnly defaultValue={user.fullname} />
          </Form.Group>
          <Form.Group controlId="date">
            <Form.Label>New password</Form.Label>
            <Form.Control
              type="password"
              value={password1}
              onChange={e => setPassword1(e.target.value)}
            />
            <Form.Text className="text-muted">Set new password</Form.Text>
          </Form.Group>
          <Form.Group controlId="password2">
            <Form.Label>Verify new password</Form.Label>
            <Form.Control
              type="password"
              value={password2}
              onChange={e => setPassword2(e.target.value)}
            />
            <Form.Text className="text-muted">
              Repeat the new password
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
