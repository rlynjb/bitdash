export const handler = async () => {
  const response = {
      statusCode: 200,
      body: JSON.stringify({ message: "Hello from Netlify function!" }),
  };
  return response;
};