import { stringToColor } from "@/utils/stringToColor";
import * as Styled from "./UserSummary.styled";
import { Avatar, Typography } from "@mui/material";

interface UserSummaryProps {
  id: string;
  fullName: string;
  username: string;
}

function UserSummary(props: UserSummaryProps) {
  const { id, fullName, username } = props;

  return (
    <Styled.User href={`/profiles/${id}`}>
      <Avatar
        sx={{
          bgcolor: stringToColor(fullName),
          marginRight: "10px",
        }}
      >
        {fullName.split(" ")[0][0]}
        {fullName.split(" ")[1][0]}
      </Avatar>
      <div>
        <Typography
          component="h5"
          sx={{
            fontSize: "18px",
            fontWeight: "700",
            marginBottom: "5px",
          }}
        >
          {username}
        </Typography>
        <Typography>{fullName}</Typography>
      </div>
    </Styled.User>
  );
}

export default UserSummary;
