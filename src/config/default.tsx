const defaultVariable: {
  BackendURL: string | undefined;
  PlaceholderImg: string;
} = {
  BackendURL: process.env.NEXT_PUBLIC_Backend_URL,
  PlaceholderImg: "https://via.placeholder.com/450x330",
};

export default defaultVariable;
