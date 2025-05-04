import React, { useState } from "react";
import {
  List,
  Box,
  Typography,
  Paper,
  Button,
  Fab,
  Tooltip,
} from "@mui/material";
import { Plus } from "lucide-react";
import { Group, Task, AppData } from "../types";
import GroupItem from "./GroupItem";
import GroupDialog from "./GroupDialog";
import TaskDialog from "./TaskDialog";
import ConfirmDialog from "./ConfirmDialog";

interface TreeViewProps {
  data: AppData;
  onDataChange: (data: AppData) => void;
}

const TreeView: React.FC<TreeViewProps> = ({ data, onDataChange }) => {
  // Dialog states
  const [groupDialogOpen, setGroupDialogOpen] = useState(false);
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  // Selected items
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Deletion target
  const [deleteTarget, setDeleteTarget] = useState<{
    type: "group" | "task";
    id: number;
  } | null>(null);

  // Group dialog handlers
  const handleOpenGroupDialog = (group: Group | null = null) => {
    setSelectedGroup(group);
    setGroupDialogOpen(true);
  };

  const handleCloseGroupDialog = () => {
    setGroupDialogOpen(false);
    setSelectedGroup(null);
  };

  const handleSaveGroup = (group: Group) => {
    if (selectedGroup) {
      // Edit existing group
      onDataChange({
        ...data,
        groups: data.groups.map((g) => (g.id === group.id ? group : g)),
      });
    } else {
      // Add new group
      onDataChange({
        ...data,
        groups: [...data.groups, group],
      });
    }
    handleCloseGroupDialog();
  };

  // Task dialog handlers
  const handleOpenTaskDialog = (task: Task | null = null) => {
    setSelectedTask(task);
    setTaskDialogOpen(true);
  };

  const handleCloseTaskDialog = () => {
    setTaskDialogOpen(false);
    setSelectedTask(null);
  };

  const handleSaveTask = (task: Task) => {
    if (selectedTask) {
      // Edit existing task
      onDataChange({
        ...data,
        tasks: data.tasks.map((t) => (t.id === task.id ? task : t)),
      });
    } else {
      // Add new task
      onDataChange({
        ...data,
        tasks: [...data.tasks, task],
      });
    }
    handleCloseTaskDialog();
  };

  // Confirm dialog handlers
  const handleOpenConfirmDialog = (type: "group" | "task", id: number) => {
    setDeleteTarget({ type, id });
    setConfirmDialogOpen(true);
  };

  const handleCloseConfirmDialog = () => {
    setConfirmDialogOpen(false);
    setDeleteTarget(null);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;

    if (deleteTarget.type === "group") {
      // Delete group and all its tasks
      onDataChange({
        groups: data.groups.filter((g) => g.id !== deleteTarget.id),
        tasks: data.tasks.filter((t) => t.groupId !== deleteTarget.id),
      });
    } else {
      // Delete task
      onDataChange({
        ...data,
        tasks: data.tasks.filter((t) => t.id !== deleteTarget.id),
      });
    }

    handleCloseConfirmDialog();
  };

  // Toggle task completion
  const handleToggleTaskComplete = (task: Task) => {
    onDataChange({
      ...data,
      tasks: data.tasks.map((t) =>
        t.id === task.id ? { ...t, done: !t.done } : t
      ),
    });
  };

  // Get tasks for a group
  const getTasksForGroup = (groupId: number) => {
    return data.tasks.filter((task) => task.groupId === groupId);
  };

  return (
    <Box>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          bgcolor: "primary.main",
          color: "white",
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" component="h1" sx={{ fontWeight: 600 }}>
          Task Manager
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleOpenGroupDialog()}
            sx={{
              color: "white",
              fontWeight: 500,
            }}
          >
            New Group
          </Button>

          <Button
            variant="contained"
            color="info"
            onClick={() => handleOpenTaskDialog()}
            sx={{
              color: "white",
              fontWeight: 500,
            }}
            disabled={data.groups.length === 0}
          >
            New Task
          </Button>
        </Box>
      </Paper>

      {data.groups.length > 0 ? (
        <List sx={{ py: 0 }}>
          {data.groups.map((group) => (
            <GroupItem
              key={group.id}
              group={group}
              tasks={getTasksForGroup(group.id)}
              onEditGroup={() => handleOpenGroupDialog(group)}
              onDeleteGroup={() => handleOpenConfirmDialog("group", group.id)}
              onEditTask={handleOpenTaskDialog}
              onDeleteTask={(task) => handleOpenConfirmDialog("task", task.id)}
              onToggleTaskComplete={handleToggleTaskComplete}
            />
          ))}
        </List>
      ) : (
        <Paper
          sx={{
            p: 4,
            textAlign: "center",
            bgcolor: "rgba(203, 213, 225, 0.2)",
            border: "1px dashed",
            borderColor: "primary.light",
            borderRadius: 3,
          }}
        >
          <Typography variant="h6" gutterBottom color="text.secondary">
            No groups yet
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Create a group to get started
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenGroupDialog()}
          >
            Create Group
          </Button>
        </Paper>
      )}

      {/* Floating Add Task Button */}
      {data.groups.length > 0 && (
        <Tooltip title="Add new task">
          <Fab
            color="primary"
            aria-label="add task"
            sx={{
              position: "fixed",
              bottom: 24,
              right: 24,
              boxShadow: "0 8px 16px rgba(37, 99, 235, 0.2)",
            }}
            onClick={() => handleOpenTaskDialog()}
          >
            <Plus />
          </Fab>
        </Tooltip>
      )}

      {/* Dialogs */}
      <GroupDialog
        open={groupDialogOpen}
        group={selectedGroup}
        onClose={handleCloseGroupDialog}
        onSave={handleSaveGroup}
      />

      <TaskDialog
        open={taskDialogOpen}
        task={selectedTask}
        groups={data.groups}
        onClose={handleCloseTaskDialog}
        onSave={handleSaveTask}
      />

      <ConfirmDialog
        open={confirmDialogOpen}
        title={`Delete ${deleteTarget?.type === "group" ? "Group" : "Task"}`}
        message={
          deleteTarget?.type === "group"
            ? "Are you sure you want to delete this group? All tasks in this group will also be deleted."
            : "Are you sure you want to delete this task?"
        }
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseConfirmDialog}
      />
    </Box>
  );
};

export default TreeView;
