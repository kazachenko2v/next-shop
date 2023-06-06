export default (searchParams: string, name: string, value: number) => {
  const params = new URLSearchParams(searchParams);
  params.set(name, value.toString());

  return params.toString();
};
