import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

export default function BasicRating(data: any) {
  const [value, setValue] = React.useState<any>(data);

  return (
    <div className="flex flex-row justify-center items-center gap-2 mt-1"> 
      <Box sx={{ "& > legend": { mt: 2 } }}>
        <Rating
          name="read-only"
          size="small"
          value={value}
          readOnly
        sx={{
          "& .MuiRating-iconFilled": {
            color: "#E384E4"
          },
          "& .MuiRating-iconEmpty": {
            color: "#grey"
          }
        }}
      />
    </Box>
    </div>

  );
}
