import React, { useState } from "react";

import { Modal, Button, Form } from "react-bootstrap";

export default function FlexDetailModal({ user, onSave }) {
  const [date, setDate] = useState(user.flexdate);
  const [value, setValue] = useState(user.flexstart);

  const handleClose = () => onSave(null);
  const handleSave = () => {
    const u = {
      personId: user.personId,
      flexdate: date,
      flexstart: value
    };
    onSave(u);
  };

  return (
    <Modal show={user != null} onHide={handleClose}>
      <Modal.Header closeButton>Edit Person Flex Hour Details</Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="fullname">
            <Form.Label>Fullname</Form.Label>
            <Form.Control type="text" readOnly defaultValue={user.fullname} />
          </Form.Group>
          <Form.Group controlId="date">
            <Form.Label>Flex start date</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
            <Form.Text className="text-muted">
              Start date for calculating flex hour balance
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="value">
            <Form.Label>Flex start value</Form.Label>
            <Form.Control
              type="text"
              value={value}
              onChange={e => setValue(e.target.value)}
            />
            <Form.Text className="text-muted">
              Start date for calculating flex hour balance
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
