import * as path from 'path';
import Mocha = require('mocha');
import glob from 'glob';

export function run(): Promise<void> {
    const mocha = new Mocha({
        ui: 'tdd',  // Use the 'tdd' UI to provide 'suite' and 'test' globals
        color: true,
    });

    const testsRoot = path.resolve(__dirname, '..');

    return new Promise((resolve, reject) => {
        const files = glob.sync('**/**.test.js', { cwd: testsRoot });

        if (files.length === 0) {
            return reject(new Error('No test files found.'));
        }

        files.forEach((file) => mocha.addFile(path.resolve(testsRoot, file)));

        try {
            mocha.run((failures) => {
                if (failures > 0) {
                    reject(new Error(`${failures} tests failed.`));
                } else {
                    resolve();
                }
            });
        } catch (err) {
            reject(err);
        }
    });
}
