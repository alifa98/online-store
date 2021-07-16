import { Product } from "./interface/Product";
import { Receipt } from "./interface/Receipt";

export class Mock {

    static getName(): string {
        return "علی";
    }

    static getProducts(filterings?: any): Product[] {
        return [
            {
                name: "محصول ۱",
                category: "کتگوری",
                imgAddress: "https://avatars.githubusercontent.com/u/31096694?v=4",
                price: "10000",
            },
            {
                name: "محصول ۱",
                category: "کتگوری",
                imgAddress: "https://avatars.githubusercontent.com/u/31096694?v=4",
                price: "1854646",
            }, {
                name: "محصول ۱",
                category: "دسته ۲",
                imgAddress: "https://avatars.githubusercontent.com/u/31096694?v=4",
                price: "10000",
            }, {
                name: "محصول ۱",
                category: "کتگوری",
                imgAddress: "https://avatars.githubusercontent.com/u/31096694?v=4",
                price: "15000",
            }, {
                name: "محصول ۱",
                category: "کتگوری",
                imgAddress: "https://avatars.githubusercontent.com/u/31096694?v=4",
                price: "1546",
            },
        ]
    }

    static getReceipts(): Receipt[] {
        return [
            {
                trackingCode: 'SHOP102030',
                productName: 'موس گیمینگ ریزر',
                amount: '10,000 تومان',
                address: 'تهران، تهران، امیرکبیر',
            },
            {
                trackingCode: 'SHOP102030',
                productName: 'موس گیمینگ ریزر',
                amount: '10,000 تومان',
                address: 'تهران، تهران، امیرکبیر',
            },
            {
                trackingCode: 'SHOP102030',
                productName: 'موس گیمینگ ریزر',
                amount: '10,000 تومان',
                address: 'تهران، تهران، امیرکبیر',
            },
            {
                trackingCode: 'SHOP102030',
                productName: 'موس گیمینگ ریزر',
                amount: '10,000 تومان',
                address: 'تهران، تهران، امیرکبیر',
            },
        ]
    }
}
