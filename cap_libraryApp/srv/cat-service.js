const cds = require('@sap/cds');

class CatalogService extends cds.ApplicationService {
    init() {
        const { Books } = this.entities;

        this.after('READ', Books, this.grantDiscount);

        this.on('submitOrder', this.reduceStock);

        return super.init();
    }

    grantDiscount(results) {
        for (let b of results) {
            if (b.stock > 200) { b.title += ' -- 11% Discount!'; }
        }
    }

    async reduceStock(req) {
        const { Books } = this.entities;
        const { book, quantity } = req.data;

        if (quantity < 1) {
            return req.error('INVALID_QUANTITY');
        }

        /*
            * let query_1_tagged = SELECT.one.from(Books).where`ID=${book}`.columns`stock`;
            
            * let query_1 = SELECT.one.from(Books).where({ ID: book }).columns(b => { b.stock });
            * const b = await cds.db.run(query_1);

                --> can be written in one line of code!
        */

        const b = await SELECT.one.from(Books).where({ ID: book }).columns(b => { b.stock });

        if (!b) {
            return req.error('BOOK_NOT_FOUND', [book]);
        }

        const { stock } = b;

        if (quantity > stock) {
            return req.error('ORDER_EXCEEDS_STOCK', [quantity, stock, book]);
        }

        /* 
            * let query_2_tagged = UPDATE(Books).where`ID=${book}`.with`stock = stock ${quantity}`;
            * let query_2 = UPDATE (Books).where({ ID: book }).with({ stock: { '-': quantity } });
        */

        await UPDATE(Books).where({ ID: book }).with({ stock: { '-': quantity } });

        return { stock: stock - quantity };
    }
}

module.exports = CatalogService;