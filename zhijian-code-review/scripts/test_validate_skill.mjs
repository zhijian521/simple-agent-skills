import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import process from 'node:process';

const scriptsDirectory = dirname(fileURLToPath(import.meta.url));
const validator = join(scriptsDirectory, 'validate_skill.mjs');
const fixturesDirectory = join(scriptsDirectory, 'fixtures');

function runFixture(name, expectedStatus) {
    const result = spawnSync(process.execPath, [validator, '--policy', join(fixturesDirectory, name)], {
        encoding: 'utf8'
    });
    if (result.status !== expectedStatus) {
        console.error(result.stdout);
        console.error(result.stderr);
        throw new Error(`${name} expected exit ${expectedStatus}, received ${result.status}`);
    }
}

runFixture('valid-policy.yml', 0);
runFixture('invalid-policy.yml', 1);
console.log('✓ zhijian-code-review 策略校验回归通过');
