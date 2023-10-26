import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import { styled } from "@mui/system";
import Iconify from "@components/iconify/Iconify";
import requestService from "@utils/axios";
import { useTheme } from "@mui/material/styles";

const HeaderRoot = styled(AccordionSummary)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(1),
  border: `1px solid ${theme.palette.grey["400"]}`,
  background: theme.palette.common.white,
  ".MuiAccordionSummary-content": {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: theme.spacing(2),
  },
}));

const TodoItem = (props) => {
  const { item, onDelete, onAdd, editable } = props;
  const { id, title, description } = item || {};
  const [form, setForm] = useState();

  const handleSubmit = () => {
    onAdd({ ...form, id: Math.random() * 100 });
  };
  const handleValue = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setForm({
      title: "",
      description: "",
    });
  }, []);

  const [expanded, setExpanded] = useState(false);

  return (
    <Accordion expanded={expanded}>
      <HeaderRoot
        expandIcon={
          <Iconify
            icon="eva:chevron-down-fill"
            onClick={() => setExpanded(!expanded)}
          />
        }
      >
        {!editable ? (
          <Typography flex={1} onClick={() => setExpanded(!expanded)}>
            {title}
          </Typography>
        ) : (
          <TextField name="title" onChange={handleValue} />
        )}

        <IconButton onClick={() => onDelete(id)}>
          <Iconify icon="eva:trash-2-outline" />
        </IconButton>
      </HeaderRoot>
      <AccordionDetails>
        <Stack py={3}>
          {!editable ? (
            <Typography>{description}</Typography>
          ) : (
            <TextField
              name="description"
              multiline
              rows={3}
              onChange={handleValue}
            />
          )}
          {editable && <Button onClick={handleSubmit}>Save</Button>}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

const Landing = () => {
  const theme = useTheme();

  const [todos, setTodos] = useState();

  const handleDelete = (id) => {
    setTodos((state) => [...state].filter((item) => item.id != id));
  };

  const handleAdd = (item) => {
    setTodos((state) => [...state, item]);

    setAdd(false);
  };

  const getTodos = async () => {
    const response = await requestService.get("/api/todos");

    if (response?.response) setTodos(response.response);
  };

  useEffect(() => {
    getTodos();
  }, []);

  // - Get todo list (/todos) Get
  // - Change status todo (/todos/:id) Put
  // - Get single todo item (/todos/:id) Get

  // @add new item
  // @delete item
  // Mockup
  // @dellete all
  const [add, setAdd] = useState(false);
  return (
    <Container maxWidth="xl" sx={{ bgcolor: theme.palette.grey["400"] }}>
      <Stack py={5} gap={2}>
        {todos &&
          todos?.map((item, index) => (
            <TodoItem key={index} item={item} onDelete={handleDelete} />
          ))}

        {add && (
          <TodoItem editable onAdd={handleAdd} onDelete={() => setAdd(false)} />
        )}

        <Stack mt={3} alignItems="flex-end">
          <Button
            onClick={() => setAdd(true)}
            variant="contained"
            color="secondary"
          >
            Add new
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Landing;
