import { Text, Button, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <Flex gap="1rem" direction="column">
      <Text>
        Add by two each click <strong>APP-3</strong>
      </Text>
      <Text>Your click count : {count} </Text>
      <Button onClick={() => setCount(count + 2)}>Click me</Button>
    </Flex>
  );
};

export default Counter;
