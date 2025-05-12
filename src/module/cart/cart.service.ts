import { Injectable } from "@nestjs/common";

@Injectable()
export class CartService {
    constructor(
        // @Inject('CART_REPOSITORY')
        // private cartRepository: Repository<Cart>,
    ) {}

    getAllCart() {
        // return this.cartRepository.find();
        return [];
    }

    getCartById(id: string) {
        // return this.cartRepository.findOne({ where: { id } });
        return null;
    }

    createCart(cart: any) {
        // return this.cartRepository.save(cart);
        return null;
    }
}