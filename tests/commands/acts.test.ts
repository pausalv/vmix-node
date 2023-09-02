import { Acts, ActsResponse } from "../../src";


test('parseCommand of Acts', () => {
  const result: ActsResponse = Acts.parseCommand(['MasterVolume', '0.5470082']);
  expect(result).toEqual({ name: 'MasterVolume', data: '0.5470082' });

  const result2: ActsResponse = Acts.parseCommand(['InputPreview', '1', '1']);
  expect(result2).toEqual({ name: 'InputPreview', data: '1 1' });

  const result3: ActsResponse = Acts.parseCommand(['Input', '1', '0']);
  expect(result3).toEqual({ name: 'Input', data: '1 0' });
});