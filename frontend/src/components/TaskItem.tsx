import React from 'react';
import { 
  ListItem, 
  ListItemText, 
  ListItemIcon, 
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Tooltip,
  Typography,
  Box,
  Checkbox,
} from '@mui/material';
import { Task } from '../types';
import { Edit, Trash2 } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onToggleComplete: (task: Task) => void;
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'easy':
      return 'success';
    case 'medium':
      return 'warning';
    case 'hard':
      return 'error';
    default:
      return 'default';
  }
};

const TaskItem: React.FC<TaskItemProps> = ({ 
  task, 
  onEdit, 
  onDelete,
  onToggleComplete
}) => {
  return (
    <ListItem
      sx={{
        mb: 1,
        p: 1,
        bgcolor: 'background.paper',
        borderRadius: 2,
        transition: 'all 0.2s ease',
        '&:hover': {
          bgcolor: 'rgba(37, 99, 235, 0.04)',
          transform: 'translateX(4px)',
        },
        border: '1px solid',
        borderColor: task.done ? 'rgba(203, 213, 225, 0.5)' : 'rgba(203, 213, 225, 1)',
        pr: 12, // Increase right padding to accommodate buttons
      }}
    >
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={task.done}
          onChange={() => onToggleComplete(task)}
          sx={{
            color: '#94a3b8',
            '&.Mui-checked': {
              color: '#2563eb',
            },
          }}
        />
      </ListItemIcon>
      
      <ListItemText 
        primary={
          <Typography
            variant="body1"
            sx={{
              textDecoration: task.done ? 'line-through' : 'none',
              color: task.done ? 'text.secondary' : 'text.primary',
              fontWeight: 500,
              transition: 'all 0.2s',
            }}
          >
            {task.name}
          </Typography>
        }
        secondary={
          task.description ? (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 0.5,
                opacity: task.done ? 0.6 : 1,
                transition: 'opacity 0.2s',
              }}
            >
              {task.description}
            </Typography>
          ) : null
        }
      />
      
      <Box sx={{ display: 'flex', alignItems: 'center', mr: 8 }}>
        <Tooltip title={`Difficulty: ${task.difficulty}`}>
          <Chip 
            label={task.difficulty} 
            size="small"
            color={getDifficultyColor(task.difficulty) as any}
            sx={{ 
              textTransform: 'capitalize',
              fontWeight: 500,
              opacity: task.done ? 0.6 : 1,
              transition: 'opacity 0.2s',
            }}
          />
        </Tooltip>
      </Box>
      
      <ListItemSecondaryAction>
        <Tooltip title="Edit task">
          <IconButton 
            edge="end" 
            aria-label="edit" 
            onClick={() => onEdit(task)}
            size="small"
            sx={{ mr: 1 }}
          >
            <Edit size={18} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete task">
          <IconButton 
            edge="end" 
            aria-label="delete" 
            onClick={() => onDelete(task)}
            size="small"
            color="error"
          >
            <Trash2 size={18} />
          </IconButton>
        </Tooltip>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TaskItem;