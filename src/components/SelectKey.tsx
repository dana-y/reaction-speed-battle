import { Box, Stack, Typography } from "@mui/material";

interface SelectKeyProps {
  playerNum: number;
}

const SelectKey = ({ playerNum }: SelectKeyProps) => {
  return (
    <Stack height="100%" gap={5}>
      <Stack>
        <Typography variant="h4" color="textPrimary">
          Select your key
        </Typography>
      </Stack>
      <Stack display="grid" flexGrow={1} gridTemplateColumns="1fr 1fr" gap={2}>
        {Array.from({ length: playerNum }).map((_, index) => (
          <Box
            key={index}
            sx={{
              backgroundColor: "tomato",
              padding: 3,
              borderRadius: 2,
            }}
          >
            <Typography variant="h4" color="textPrimary">
              Player {index + 1}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
};

export default SelectKey;
