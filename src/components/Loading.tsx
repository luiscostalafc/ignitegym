import { Spinner, Center } from "@gluestack-ui/themed";

export function Loading() {
  return (
    <Center flex={1}>
      <Spinner />
    </Center>
  );
}
