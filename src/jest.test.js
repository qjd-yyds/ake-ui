
test('test common matcher', () => {
  expect(2 + 2).toBe(4);
  expect(2 + 2).not.toBe(9)
});

test('test common matcher', () => {
  expect(2 + 2).toBe(4);
  expect(2 + 2).not.toBe(9)
});

test('test to be true or false', () => {
  expect(1).toBeTruthy();
  expect(0).toBeFalsy();
});

test("to be object", () => {
  expect({
    name:"看客"
  }).toEqual({
    name:"看客"
  })
})