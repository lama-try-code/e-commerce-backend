import { Body, Controller, Get, Param, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CartService } from "./cart.service";
import { JwtAuthGuard } from "../../common/guards/jwt.guard";
import { AddProductToCartDto } from "../product/dto/add-product-to-cart.dto";
import { Role } from "src/common/constants/role.enum";
import { Roles } from "src/common/decorators/roles.decorator";
import { RolesGuard } from "../../common/guards/role.guard";

@ApiTags('Cart')
@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService){}

    @Get()
    async getAllCart() {
        return this.cartService.getAllCart();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.CUSTOMER)
    @ApiBearerAuth('JWT')
    async getCartByUserId(@Param('id') id: string) {
        return await this.cartService.getCartByUserId(id);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.CUSTOMER)
    @ApiBearerAuth('JWT')
    async addProductToCart(@Param('id') id: string, @Body() addProductToCartDto: AddProductToCartDto) {
        return await this.cartService.addProductToCart(id, addProductToCartDto);
    }
}