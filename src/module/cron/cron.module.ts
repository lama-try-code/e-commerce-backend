import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bullmq"
import { CronScheduler } from "./cron.scheduler";
import { ProductsConsumer } from "./cron.product";
import { ScheduleModule } from "@nestjs/schedule";
import { ProductModule } from "../product/product.module";
import { Queue, QueueEvents } from "bullmq";
import { productsQueueEventProvider } from "./cron.provider";

@Module({
    imports: [
        BullModule.forRoot({
            connection: {
                host: 'localhost',
                port: 6379
            }
        }),
        BullModule.registerQueue({
            name: 'products'
        }),
        ScheduleModule.forRoot(),
        ProductModule
    ],
    providers: [CronScheduler, ProductsConsumer, productsQueueEventProvider]
})

export class CronModule { }