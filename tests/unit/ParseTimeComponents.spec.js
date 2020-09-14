import parseTimeComponents from "@/parseTimeComponents";

describe('time components', () => {

  it('should parse time components into two numbers', async () => {
    const {left, right} = parseTimeComponents("3:00");

    expect(left).toStrictEqual(3)
    expect(right).toStrictEqual(0)
  });

});