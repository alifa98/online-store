import { Category } from "./interface/category";
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


    static getCategories(): Category[] {
        return [
            {
                id: 25,
                name: 'شرق گستر غرب پرور',
            },
            {
                id: 1,
                name: 'خفن آفرینان آسیا گستر',
            },
            {
                id: 26,
                name: 'محصولات خفن',
            },
            {
                id: 7,
                name: 'دسته',
            }, {
                id: 9,
                name: 'نام آوران کهن ایرانیان آریایی شرق و غرب (هخا)',
            }

        ]

    }
}
