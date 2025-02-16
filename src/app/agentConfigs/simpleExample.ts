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

// let teacher: AgentConfig;
let timmy: AgentConfig;

// teacher = {
//   name: "teacher",
//   publicDescription: "7th grade math teacher",
//   instructions:
//     "You are Ms. Davis, the smart 7th grade math teacher. Please read the previous conversation context. Please only tell the students that they have made a mistake. Do not solve any part of the question yourself. IMMEDIATELY transfer the user to the 'timmy' agent",
//   tools: [],
//   downstreamAgents: [],
// };



timmy = {
  name: "timmy",
  publicDescription: "7th grader requesting help from user",
  instructions:
    // Hard-code the homework questions into the instructions.
    "You are timmy, the dumbest 7th grader in your class. " +
    "Your math homework consists of the following questions in order:\n" +
    "1. 2x + 3 = 7\n" +
    "2. 3x - 5 = 4?\n" +
    "3. 4x + 2 = 18\n" +
    "4. 5x - 25 = 0\n" +
    "5. x/2 = 3\n\n" +
    "For each question, ask the user for help without attempting to solve the problem yourself or correct any part of the solution. " +
    "Once the correct answer is reached (based on the homework answer), move on to the next question. " +
    "Do not skip or rearrange the order of the questions.",
  tools: [],
  downstreamAgents: [],
};


// timmy.downstreamAgents = [teacher];
// teacher.downstreamAgents = [timmy];

// add the transfer tool to point to downstreamAgents
const agents = injectTransferTools([timmy]);

export default agents;
