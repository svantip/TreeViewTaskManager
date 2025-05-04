import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import { Group } from '../types';

interface GroupDialogProps {
  open: boolean;
  group: Group | null;
  onClose: () => void;
  onSave: (group: Group) => void;
}

const GroupDialog: React.FC<GroupDialogProps> = ({
  open,
  group,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  useEffect(() => {
    if (group) {
      setName(group.name);
      setNameError('');
    } else {
      setName('');
      setNameError('');
    }
  }, [group, open]);

  const handleSave = () => {
    if (!name.trim()) {
      setNameError('Group name cannot be empty');
      return;
    }

    onSave({
      id: group?.id || Date.now(),
      name: name.trim(),
    });
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 3,
          width: '100%',
          maxWidth: '500px',
        }
      }}
    >
      <DialogTitle>
        {group ? 'Edit Group' : 'Create Group'}
      </DialogTitle>
      
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Group Name"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (e.target.value.trim()) {
              setNameError('');
            }
          }}
          error={!!nameError}
          helperText={nameError}
          sx={{ mt: 1 }}
        />
      </DialogContent>
      
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} color="inherit" sx={{ mr: 1 }}>
          Cancel
        </Button>
        <Button 
          onClick={handleSave} 
          variant="contained" 
          color="primary"
        >
          {group ? 'Save Changes' : 'Create Group'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GroupDialog;