import { assert, expect, should } from 'chai'
import ProductsPage from '../pageobjects/products.page.js'
import ProductDetailsPage from '../pageobjects/product-details.page.js'

should()

describe('JS Tools Task - Products with Chai', () => {
    beforeEach(async () => {
        await ProductsPage.open()
        assert.strictEqual((await ProductsPage.heading.getText()).toUpperCase(), 'ALL PRODUCTS')
    })

    it('opens the first product and displays its details', async () => {
        const products = await ProductsPage.productNames
        assert.isAbove(products.length, 0)
        const firstProductName = await products[0].getText()
        await ProductsPage.viewFirstProduct()

        await ProductDetailsPage.name.waitForDisplayed()
        expect(await ProductDetailsPage.name.getText()).to.equal(firstProductName)

        const details = await ProductDetailsPage.information.getText()
        expect(details).to.include('Category:').and.include('Rs.')
        expect(details).to.include('Availability:').and.include('Condition:').and.include('Brand:')
    })

    it('shows matching products after searching for Blue Top', async () => {
        await ProductsPage.searchFor('Blue Top')

        const heading = await ProductsPage.heading.getText()
        heading.toUpperCase().should.equal('SEARCHED PRODUCTS')

        const products = await ProductsPage.productNames
        const names = await Promise.all(products.map((product) => product.getText()))
        names.should.include('Blue Top')
        names.forEach((name) => name.toLowerCase().should.include('blue top'))
    })
})
