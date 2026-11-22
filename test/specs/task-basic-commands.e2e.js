import { $, $$, browser, expect } from '@wdio/globals'

describe('Task Basic Commands', () => {
    beforeEach(async () => {
        await browser.url('/')
    })

    it('displays the task form', async () => {
        const taskName = await $('#task-name')
        await taskName.waitForExist()
        await taskName.waitForDisplayed()

        expect(await taskName.isExisting()).toBe(true)
        expect(await taskName.isDisplayed()).toBe(true)
    })

    it('finds both starting tasks', async () => {
        const tasks = await $$('#tasks li')

        expect(tasks).toHaveLength(2)
        await expect(tasks[0]).toHaveText('Read the assignment')
        await expect(tasks[1]).toHaveText('Run the tests')
    })

    it('replaces text and appends to the input', async () => {
        const taskName = await $('#task-name')
        await taskName.setValue('Draft')
        await taskName.setValue('Review')
        await taskName.addValue(' WDIO commands')

        await expect(taskName).toHaveValue('Review WDIO commands')
    })

    it('adds a new task and clears the input', async () => {
        const taskName = await $('#task-name')
        await taskName.setValue('Practice WebdriverIO')
        await $('#task-form button').click()

        await expect($('#tasks li:last-child')).toHaveText('Practice WebdriverIO')
        await expect(taskName).toHaveValue('')
    })

    it('waits for a delayed button before clicking it', async () => {
        const loadedTaskButton = $('#show-loaded-task')
        expect(await loadedTaskButton.isExisting()).toBe(false)

        await $('#load-tasks').click()
        await loadedTaskButton.click()

        await expect($('#tasks li:last-child')).toHaveText('Review the results')
    })
})
