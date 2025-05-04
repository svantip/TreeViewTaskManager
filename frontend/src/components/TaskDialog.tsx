import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  SelectChangeEvent,
  Stack,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { Task, Group } from '../types';

interface TaskDialogProps {
  open: boolean;
  task: Task | null;
  groups: Group[];
  onClose: () => void;
  onSave: (task: Task) => void;
}

const TaskDialog: React.FC<TaskDialogProps> = ({
  open,
  task,
  groups,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [groupId, setGroupId] = useState<number>(0);
  const [done, setDone] = useState(false);
  
  const [nameError, setNameError] = useState('');
  const [groupError, setGroupError] = useState('');

  useEffect(() => {
    if (task) {
      setName(task.name);
      setDescription(task.description);
      setDifficulty(task.difficulty);
      setGroupId(task.groupId);
      setDone(task.done);
      setNameError('');
      setGroupError('');
    } else {
      setName('');
      setDescription('');
      setDifficulty('easy');
      setGroupId(groups.length > 0 ? groups[0].id : 0);
      setDone(false);
      setNameError('');
      setGroupError('');
    }
  }, [task, groups, open]);

  const handleSave = () => {
    if (!name.trim()) {
      setNameError('Task name cannot be empty');
      return;
    }

    if (!groupId) {
      setGroupError('Please select a group');
      return;
    }

    onSave({
      id: task?.id || Date.now(),
      name: name.trim(),
      description: description.trim(),
      difficulty,
      groupId,
      done,
    });
  };

  const handleGroupChange = (event: SelectChangeEvent<number>) => {
    setGroupId(Number(event.target.value));
    setGroupError('');
  };

  const handleDifficultyChange = (event: SelectChangeEvent) => {
    setDifficulty(event.target.value as 'easy' | 'medium' | 'hard');
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
        {task ? 'Edit Task' : 'Create Task'}
      </DialogTitle>
      
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            autoFocus
            label="Task Name"
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
          />
          
          <TextField
            label="Description (optional)"
            type="text"
            fullWidth
            multiline
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          
          <FormControl fullWidth>
            <InputLabel id="difficulty-label">Difficulty</InputLabel>
            <Select
              labelId="difficulty-label"
              value={difficulty}
              label="Difficulty"
              onChange={handleDifficultyChange}
            >
              <MenuItem value="easy">Easy</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="hard">Hard</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl fullWidth error={!!groupError}>
            <InputLabel id="group-label">Group</InputLabel>
            <Select
              labelId="group-label"
              value={groupId}
              label="Group"
              onChange={handleGroupChange}
            >
              {groups.map((group) => (
                <MenuItem key={group.id} value={group.id}>
                  {group.name}
                </MenuItem>
              ))}
            </Select>
            {groupError && <FormHelperText>{groupError}</FormHelperText>}
          </FormControl>
          
          <FormControlLabel
            control={
              <Switch
                checked={done}
                onChange={(e) => setDone(e.target.checked)}
                color="primary"
              />
            }
            label="Mark as completed"
          />
        </Stack>
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
          {task ? 'Save Changes' : 'Create Task'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDialog;