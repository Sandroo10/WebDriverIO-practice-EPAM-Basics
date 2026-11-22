import { $, $$, browser } from '@wdio/globals'

class ProductsPage {
    get heading() {
        return $('.features_items h2.title')
    }

    get productNames() {
        return $$('.features_items .productinfo p')
    }

    get firstProductLink() {
        return $('.features_items a[href^="/product_details/"]')
    }

    async open() {
        await browser.url('https://www.automationexercise.com/')
        await $('#header a[href="/products"]').click()
        await this.heading.waitForDisplayed()
    }

    async searchFor(name) {
        await $('#search_product').setValue(name)
        await $('#submit_search').click()
        await this.heading.waitForDisplayed()
    }

    async viewFirstProduct() {
        await this.firstProductLink.click()
    }
}

export default new ProductsPage()
