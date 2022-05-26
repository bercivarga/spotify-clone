import { Box } from "@chakra-ui/layout";
import { PropsWithChildren } from "react";

const PlayerLayout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Box>
      Layout
      {children}
    </Box>
  );
};

export default PlayerLayout;
