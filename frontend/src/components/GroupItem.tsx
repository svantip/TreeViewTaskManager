import React, { useState } from 'react';
import { 
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Collapse,
  Typography,
  Badge,
  Tooltip,
  Box,
} from '@mui/material';
import { 
  ChevronRight, 
  ChevronDown, 
  Edit, 
  Trash2 
} from 'lucide-react';
import { Group, Task } from '../types';
import TaskItem from './TaskItem';

interface GroupItemProps {
  group: Group;
  tasks: Task[];
  onEditGroup: (group: Group) => void;
  onDeleteGroup: (group: Group) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (task: Task) => void;
  onToggleTaskComplete: (task: Task) => void;
}

const GroupItem: React.FC<GroupItemProps> = ({
  group,
  tasks,
  onEditGroup,
  onDeleteGroup,
  onEditTask,
  onDeleteTask,
  onToggleTaskComplete,
}) => {
  const [open, setOpen] = useState(true);
  const completedTasks = tasks.filter(task => task.done).length;

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ mb: 2 }}>
      <ListItem
        button
        onClick={handleToggle}
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 2,
          mb: 1,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          transition: 'all 0.2s',
          '&:hover': {
            bgcolor: 'rgba(37, 99, 235, 0.08)',
          },
        }}
      >
        <ListItemIcon>
          {open ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </ListItemIcon>
        
        <ListItemText
          primary={
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {group.name}
            </Typography>
          }
        />
        
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 6 }}>
          <Tooltip title={`${completedTasks} of ${tasks.length} tasks completed`}>
            <Badge 
              badgeContent={`${completedTasks}/${tasks.length}`} 
              color="primary"
              sx={{
                '& .MuiBadge-badge': {
                  fontSize: '0.75rem',
                  height: '22px',
                  minWidth: '22px',
                  borderRadius: '11px',
                  padding: '0 6px',
                }
              }}
            />
          </Tooltip>
        </Box>
        
        <ListItemSecondaryAction>
          <Tooltip title="Edit group">
            <IconButton 
              edge="end" 
              aria-label="edit"
              onClick={(e) => {
                e.stopPropagation();
                onEditGroup(group);
              }}
              size="small"
              sx={{ mr: 1 }}
            >
              <Edit size={18} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete group">
            <IconButton 
              edge="end" 
              aria-label="delete" 
              onClick={(e) => {
                e.stopPropagation();
                onDeleteGroup(group);
              }}
              size="small"
              color="error"
            >
              <Trash2 size={18} />
            </IconButton>
          </Tooltip>
        </ListItemSecondaryAction>
      </ListItem>
      
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding sx={{ pl: 4 }}>
          {tasks.length > 0 ? (
            tasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
                onToggleComplete={onToggleTaskComplete}
              />
            ))
          ) : (
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ 
                py: 2, 
                px: 2, 
                fontStyle: 'italic',
                bgcolor: 'rgba(203, 213, 225, 0.2)',
                borderRadius: 2,
                mt: 1,
              }}
            >
              No tasks in this group
            </Typography>
          )}
        </List>
      </Collapse>
    </Box>
  );
};

export default GroupItem;