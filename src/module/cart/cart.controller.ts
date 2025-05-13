import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CartService } from "./cart.service";
import { JwtAuthGuard } from "../auth/jwt.guard";

@ApiTags('Cart')
@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService){}

    @Get()
    async getAllCart() {
        return this.cartService.getAllCart();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT')
    async getCartByUserId(@Param('id') id: string) {
        return this.cartService.getCartByUserId(id);
    }
}