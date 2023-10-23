import { stringToColor } from "@/utils/stringToColor";
import { Avatar as MUIAvatar } from "@mui/material";

type AvatarProps = {
  fullName?: string;
};

function Avatar({ fullName = "" }: AvatarProps) {
  return (
    <MUIAvatar
      sx={{
        bgcolor: stringToColor(fullName),
      }}
    >
      {fullName.split(" ")[0][0]}
      {fullName.split(" ")[1][0]}
    </MUIAvatar>
  );
}

export default Avatar;
