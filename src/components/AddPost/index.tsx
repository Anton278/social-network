import * as Styled from "./AddPost.styled";
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Tooltip,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

function AddPost() {
  return (
    <div>
      <TextField
        label="What you want to tell?"
        multiline
        maxRows={8}
        fullWidth
      />
      <Styled.BottomRow>
        <Styled.CheckboxWrapper>
          <FormControlLabel control={<Checkbox />} label="Only for friends" />
          <Tooltip title="Only your friends will see this post" placement="top">
            <InfoOutlinedIcon />
          </Tooltip>
        </Styled.CheckboxWrapper>
        <Button variant="contained" endIcon={<SendIcon />}>
          Publish
        </Button>
      </Styled.BottomRow>
    </div>
  );
}

export default AddPost;
