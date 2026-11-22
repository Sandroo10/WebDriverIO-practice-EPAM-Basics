# WebdriverIO Practice

The project uses WebdriverIO, Mocha, and Chrome. Install the locked dependencies with `npm ci`, then run all specs with `npm test`.

| Spec | Coverage |
| --- | --- |
| `task-basic-commands.e2e.js` | Five scenarios covering selectors, text entry, visibility, and clicks. The custom click waits for the element to exist, be displayed, and be clickable. |
| `task-advanced-commands.e2e.js` | Browser-side JavaScript, polling with `waitUntil()`, keyboard actions, attributes and properties, cookies, and local storage. |
| `JSToolsTask.e2e.js` | Automation Exercise product details and search using the Page Object Model and all three Chai interfaces. |

Run only the JS Tools task with `npm run wdio:js-tools`. It uses [Automation Exercise cases 8 and 9](https://www.automationexercise.com/test_cases). The basic and advanced specs use a local test page.

Chai offers three assertion styles. `assert.strictEqual(actual, expected)` uses a direct function call. `expect(actual).to.equal(expected)` starts a chain with a function call. `actual.should.equal(expected)` starts a chain on the value after calling `should()` once.
