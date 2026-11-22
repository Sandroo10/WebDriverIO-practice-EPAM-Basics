import { $ } from '@wdio/globals'

class ProductDetailsPage {
    get name() {
        return $('.product-information h2')
    }

    get information() {
        return $('.product-information')
    }
}

export default new ProductDetailsPage()
