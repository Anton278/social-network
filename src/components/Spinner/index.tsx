import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const ring = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const Wrapper = styled.div<{ size: string | number }>((props) => ({
  display: "inline-block",
  position: "relative",
  width: `${props.size}px`,
  height: `${props.size}px`,

  "& div": {
    position: "absolute",
    width: `${+props.size / 1.25}px`,
    height: `${+props.size / 1.25}px`,
    margin: `${+props.size / 10}px`,
    border: `${+props.size / 10}px solid #fff`,
    borderRadius: "50%",
    animation: `${ring} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite`,
    borderColor: "#fff transparent transparent transparent",
  },
  "& div:nth-child(1)": {
    animationDelay: " -0.45s",
  },
  "& div:nth-child(2)": {
    animationDelay: " -0.3s",
  },
  "& div:nth-child(3)": {
    animationDelay: " -0.15s",
  },
}));

type SpinnerProps = {
  size?: string | number;
};

function Spinner({ size = 24 }: SpinnerProps) {
  return (
    <Wrapper size={size}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </Wrapper>
  );
}

export default Spinner;
