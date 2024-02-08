import { Grid, Paper, Typography } from "@mui/material";

interface Props {
  categories: string[];
}

export default function CategoriesGrid({ categories }: Props) {
  return (
    <Grid sx={{ flexGrow: 1, padding: 5 }} container spacing={2}>
      <Grid item xs={12}>
        {categories &&
          categories.map((category: string) => (
            <Grid key={category} item sx={{ p: 1, gap: 2 }}>
              <Paper
                sx={{
                  height: 100,
                  width: 100,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography>{category}</Typography>
              </Paper>
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
}
