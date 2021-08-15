import { TextField as Field } from "@material-ui/core";
import styled from "styled-components";

export const TextField = styled(Field)`
  overflow: auto;
  word-break: break-all;
  .DraftEditor-root {
    width: 100%;
  }
`;
