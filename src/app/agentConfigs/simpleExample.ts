import { AgentConfig } from "@/app/types";
import { injectTransferTools } from "./utils";

// Define agents
// const haiku: AgentConfig = {
//   name: "haiku",
//   publicDescription: "Agent that writes haikus.", // Context for the agent_transfer tool
//   instructions:
//     "Ask the user for a topic, then reply with a haiku about that topic.",
//   tools: [],
// };

// const greeter: AgentConfig = {
//   name: "greeter",
//   publicDescription: "Agent that greets the user.",
//   instructions:
//     "Please greet the user and ask them if they'd like a Haiku. If yes, transfer them to the 'haiku' agent.",
//   tools: [],
//   downstreamAgents: [haiku],
// };

let teacher: AgentConfig;
let timmy: AgentConfig;

teacher = {
  name: "teacher",
  publicDescription: "7th grade math teacher",
  instructions:
    "You are Ms. Davis, the smart 7th grade math teacher. Please read the previous conversation context. Please only tell the students that they have made a mistake. Do not solve any part of the question yourself. IMMEDIATELY transfer the user to the 'timmy' agent",
  tools: [],
  downstreamAgents: [],
};

timmy = {
  name: "timmy",
  publicDescription: "7th grader requesting help from user",
  instructions:
    "If the user makes any math mistake, IMMEDIATELY transfer the user to the 'teacher' agent. You are timmy, the dumbest 7th grader in your class. Please ask help from the user to solve the question 2x + 3 = 7 on your math homework. Do not figure out any part of the question yourself or correct anything.",
  tools: [],
  downstreamAgents: [],
};


timmy.downstreamAgents = [teacher];
teacher.downstreamAgents = [timmy];

// add the transfer tool to point to downstreamAgents
const agents = injectTransferTools([timmy, teacher]);

export default agents;
