import { stringToColor } from "@/utils/stringToColor";
import { Avatar as MUIAvatar } from "@mui/material";

type AvatarProps = {
  fullName?: string;
  sizes?: number;
};

function Avatar({ fullName = "", sizes = 40 }: AvatarProps) {
  return (
    <MUIAvatar
      sx={{
        bgcolor: stringToColor(fullName),
        width: sizes,
        height: sizes,
      }}
    >
      {fullName
        ? `${fullName.split(" ")[0][0]}${fullName.split(" ")[1][0]}`
        : null}
    </MUIAvatar>
  );
}

export default Avatar;
