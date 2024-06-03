export type ProductProps = {
    id: string
    name: string,
    price: number
    quantity: number
}
/*
Essa classe nao possui setters pois espera-se que as entidades de dominio sejam entidades ricas
ou seja
que tenham a regra de negocios e nao sejam simplesmente um armazenador de dados

*/
export class Product {

    private constructor(private props: ProductProps) {
        this.validate()
    }

    static create(name: string, price: number) {
        return new Product({
            name,
            price,
            id: crypto.randomUUID().toString(),
            quantity: 0
        })
    }


    static with(props: ProductProps) {
        return new Product(props)
    }

    private validate() {
        if (this.props.quantity < 0) {
            throw new Error('Invalid product')
        }
    }

    get id() {
        return this.props.id
    }

    get name() {
        return this.props.name
    }

    get price() {
        return this.props.price
    }

    get quantity() {
        return this.props.quantity
    }


    increaseQuantity(quantity: number){
        this.props.quantity += quantity
    }

    decreaseQuantity(quantity: number){
        this.props.quantity -= quantity
    }
}