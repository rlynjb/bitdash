// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function handler(req: any, res: any) {
  res.status(200).json({ message: 'Hello, World!' });
}