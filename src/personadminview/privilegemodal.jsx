import React, { useState } from "react";

import {
  Modal,
  Button,
  Form,
  ToggleButtonGroup,
  ToggleButton,
  Row
} from "react-bootstrap";

export default function PrivilegeModal({ user, onSave }) {
  const [privilege, setPrivilege] = useState(user.rights);

  const handleClose = () => onSave(null);
  const handleSave = () => {
    const u = {
      personId: user.personId,
      rights: privilege
    };
    onSave(u);
  };

  return (
    <Modal size="lg" show={user != null} onHide={handleClose}>
      <Modal.Header closeButton>Edit Person Rights</Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="password1">
            <Form.Label>Fullname</Form.Label>
            <Form.Control type="text" readOnly defaultValue={user.fullname} />
          </Form.Group>
          <ToggleButtonGroup
            type="radio"
            name="hourformat"
            value={privilege}
            onChange={(value, event) => setPrivilege(value)}
          >
            <ToggleButton as={Row} disabled={false} value={0}>
              Deleted
            </ToggleButton>
            <ToggleButton disabled={false} value={1}>
              Closed
            </ToggleButton>
            <ToggleButton disabled={false} value={2}>
              Contractor
            </ToggleButton>
            <ToggleButton disabled={false} value={3}>
              Team member
            </ToggleButton>
            <ToggleButton disabled={false} value={4}>
              Project manager
            </ToggleButton>
            <ToggleButton disabled={false} value={5}>
              Administrator
            </ToggleButton>
          </ToggleButtonGroup>
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
