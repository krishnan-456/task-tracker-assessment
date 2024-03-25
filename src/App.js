import { Box, Button, Flex, FormInput, Text } from "@sparrowengg/twigs-react";
import {
  Add_task,
  Delete_task,
  Edit_task,
  Mark_task,
} from "./redux/ActionCreator";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TickCircleFillIcon } from "@sparrowengg/twigs-react-icons";

const App = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [newTask, setNewTask] = useState("");
  const [show, setShow] = useState({
    id: 0,
    bol: false,
  });
  console.log(tasks);
  return (
    <Box className="container">
      <Text css={{fontSize:"24px", padding:"$15 0", fontWeight:"$8"}}>Task Tracker</Text>
      <Flex
        gap="$8"
        css={{
          // paddingTop: "$30",
          flexDirection: "column",
          "@screen-xl": { flexDirection: "row" },
        }}
      >
        <FormInput
          placeholder="Enter the task"
          css={{
            width: "340px",
            padding: "$14 $10",
            fontSize: "16px",
            "@screen-md": { width: "680px", padding: "$14 $10", fontSize:"18px" },
            "@screen-xl": { width: "1024px", padding: "$14 $10" },
          }}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          css={{ padding: "$14 $14" }}
          onClick={() => {
            if (input.length < 4) {
              alert("Task length is less than 4 character");
            } else {
              dispatch(Add_task(input));
            }
          }}
        >
          Add Task
        </Button>
      </Flex>
      <Box>
        {tasks?.map((val, i) => (
          <Flex
            alignItems="center"
            justifyContent="space-between"
            css={{
              width: "340px",
              padding: "$4",
              border: "1px solid $accent100",
              borderRadius: "$md",
              marginTop: "$10",
              "@screen-md": {
                width: "690px",
                padding: "$8",
              },
              "@screen-xl": {
                width: "1185px",
                padding: "$8",
              },
            }}
            key={i}
          >
            {val.status ? (
              <Flex
                css={{
                  width: "100%",
                  flexDirection: "column",
                  "@screen-xl": { flexDirection: "row" },
                }}
                alignItems="center"
                justifyContent="space-between"
                gap="10px"
              >
                <Flex
                  alignItems="center"
                  justifyContent="start"
                  gap="$4"
                  css={{
                    color: "Green",
                    width: "100%",
                    border: "1px solid $accent100",
                    padding: "$10",
                    // marginBottom: "14px",
                    borderRadius: "$md",
                    "@screen-xl":{
                      marginBottom:"0",
                      border:"none"
                    }
                  }}
                >
                  {val.task}
                  <TickCircleFillIcon color="Green" />
                </Flex>
                <Button
                  css={{
                    width: "200px",
                    padding: "$10 $8",
                    "@screen-xl": { width: "130px" },
                  }}
                  color="error"
                  onClick={() => dispatch(Delete_task(val.id))}
                >
                  Delete
                </Button>
              </Flex>
            ) : (
              <Flex
                alignItems="center"
                justifyContent="space-between"
                gap="10px"
                css={{
                  width: "100%",
                  flexDirection: "column",
                  "@screen-xl": { flexDirection: "row" },
                }}
              >
                <Box
                  css={{
                    width: "100%",
                    border: "1px solid $accent100",
                    padding: "$10",
                    borderRadius: "$md",
                    "@screen-xl":{
                      border:"none"
                    }
                  }}
                >
                  {val.task}
                </Box>
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  css={{
                    "@screen-xl": { flexDirection: "row", gap: "10px" },
                    flexDirection: "column",
                    gap: "$4",
                  }}
                >
                  <Button
                    css={{
                      width: "200px",
                      padding: "$10 $8",
                      "@screen-xl": { width: "130px" },
                    }}
                    onClick={() => {
                      setShow({
                        id: val.id,
                        bol: true,
                      });
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    css={{
                      width: "200px",
                      padding: "$10 $8",
                      "@screen-xl": { width: "130px" },
                    }}
                    color="error"
                    onClick={() => dispatch(Delete_task(val.id))}
                  >
                    Delete
                  </Button>
                  <Button
                    css={{
                      width: "200px",
                      padding: "$10 $8",
                      "@screen-xl": { width: "130px" },
                    }}
                    color="secondary"
                    onClick={() => dispatch(Mark_task(val.id))}
                  >
                    Completed
                  </Button>
                </Flex>
                {show.id === val.id && show.bol ? (
                  <Flex
                    alignItems="center"
                    gap="$4"
                    css={{
                      flexDirection: "column",
                      "@screen-xl": { flexDirection: "row" },
                    }}
                  >
                    <FormInput
                      placeholder="update the task"
                      css={{
                        width: "320px",
                        padding: "$10",
                        fontSize: "16px",
                        marginTop: "$4",
                        "@screen-md": {
                          width: "640px",
                          fontSize:"18px"
                        },
                        "@screen-xl": {width:"240px", marginTop: "0" },
                      }}
                      onChange={(e) => {
                        setNewTask(e.target.value);
                      }}
                    />
                    <Button
                      color="secondary"
                      css={{
                        width: "200px",
                        padding: "$10 $8",
                        "@screen-xl": { width: "130px" },
                      }}
                      onClick={() => {
                        if (newTask.length < 4) {
                          alert("Task length is less than 4 character");
                        } else {
                          dispatch(Edit_task(val.id, newTask));
                          setShow(false);
                        }
                      }}
                    >
                      Update
                    </Button>
                  </Flex>
                ) : null}
              </Flex>
            )}
          </Flex>
        ))}
      </Box>
    </Box>
  );
};

export default App;
