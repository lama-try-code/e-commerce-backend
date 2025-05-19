import { InjectQueue } from "@nestjs/bullmq";
import { Inject, Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { Queue, QueueEvents } from "bullmq";


@Injectable() 
export class CronScheduler {
    constructor(
        @InjectQueue('products') private readonly productsQueue: Queue,
        @Inject('PRODUCT_QUEUE_EVENTS') private readonly queueEvents: QueueEvents,
    ) {}

    @Cron(CronExpression.EVERY_DAY_AT_11PM)
    async handleCron() {
       const job = await this.productsQueue.add('export-inventory', {
        timestamp: new Date().toLocaleDateString().toString()
       })
       const result = await job.waitUntilFinished(this.queueEvents);
       console.log('[Scheduler] Job result: ', result);
    }
}