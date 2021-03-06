import * as path from 'path';
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';

export function writeUsefultTestInformation(testIndex: number, fixtureDataStr, dataStr) {
  const dir = path.resolve(__dirname, '..', '..', '..', 'log', `${testIndex}`);

  mkdirp.sync(dir);

  fs.writeFileSync(path.resolve(dir, 'original.json'), fixtureDataStr);
  fs.writeFileSync(path.resolve(dir, 'result.json'), dataStr);
}
