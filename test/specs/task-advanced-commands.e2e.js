import { $, browser, expect } from '@wdio/globals'
import { Key } from 'webdriverio'

describe('Task Advanced Commands', () => {
    beforeEach(async () => {
        await browser.url('/')
    })

    it('reads the task names from the DOM with execute()', async () => {
        const taskNames = await browser.execute(() =>
            Array.from(document.querySelectorAll('#tasks li'), (task) => task.textContent)
        )

        expect(taskNames).toEqual(['Read the assignment', 'Run the tests'])
    })

    it('waits for a browser-side promise with execute()', async () => {
        const heading = await browser.execute(() => new Promise((resolve) => {
            requestAnimationFrame(() => resolve(document.querySelector('h1').textContent))
        }))

        expect(heading).toBe('Task List')
    })

    it('waits for the loading status to change with waitUntil()', async () => {
        const status = await $('#status')
        await $('#load-tasks').click()

        await browser.waitUntil(async () => (await status.getText()) === 'Tasks loaded', {
            timeout: 5000,
            timeoutMsg: 'Expected the task list status to change to Tasks loaded'
        })

        await expect($('#show-loaded-task')).toBeDisplayed()
    })

    it('submits a task with a keyboard action', async () => {
        const taskName = await $('#task-name')
        await taskName.click()
        await taskName.setValue('Submit with Enter')

        await browser.action('key').down(Key.Enter).up(Key.Enter).perform()

        await expect($('#tasks li:last-child')).toHaveText('Submit with Enter')
    })

    it('reads an input attribute and its current property', async () => {
        const taskName = await $('#task-name')
        await taskName.setValue('Check the input')

        expect(await taskName.getAttribute('name')).toBe('task')
        expect(await taskName.getProperty('value')).toBe('Check the input')
    })

    it('sets, reads, and deletes a cookie', async () => {
        const cookieName = 'task_view'
        await browser.setCookies({ name: cookieName, value: 'compact', path: '/', sameSite: 'Lax' })

        try {
            await browser.refresh()
            const [cookie] = await browser.getCookies({ name: cookieName })
            expect(cookie).toMatchObject({ name: cookieName, value: 'compact' })
        } finally {
            await browser.deleteCookies([cookieName])
        }

        expect(await browser.getCookies({ name: cookieName })).toEqual([])
    })

    it('keeps a preference in local storage after refresh', async () => {
        const key = 'task-sort'
        await browser.execute((key) => localStorage.setItem(key, 'newest'), key)

        try {
            await browser.refresh()
            const sortOrder = await browser.execute((key) => localStorage.getItem(key), key)
            expect(sortOrder).toBe('newest')
        } finally {
            await browser.execute((key) => localStorage.removeItem(key), key)
        }
    })
})
